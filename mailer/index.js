const express = require("express");
const firebase_config = require("./FirebaseConfig.json");
const email_config = require("./EmailConfig.json");
const firebase = require('firebase');
const milliseconds_in_day = 86400000;
const nodemailer = require('nodemailer');

firebase.initializeApp(firebase_config);

const gmailEmail = email_config.email;
const gmailPassword = email_config.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// New express application.
const app = express();

const addr = process.env.ADDR || ":80";
//split host and port using destructuring.
const [host, port] = addr.split(":");

app.use(function(req, res, next) {
    res.send('Operational');
});

app.listen(port, host, () => {
    let members = [];
    let posts = [];

    let memberRef = firebase.database().ref('members');
    memberRef.on('value', (snapshot) => {
        let membersObject = snapshot.val();
        let memberArray = Object.keys(membersObject).map(id => {
            return {
                email: membersObject[id].email,
                firstName: membersObject[id].firstName,
            }
        });

        members = memberArray;
    });

    let pastDay = new Date().getTime() - (2400 * 3600 * 1000);
    let postRef = firebase.database().ref('posts').orderByChild('date').startAt(pastDay);
    postRef.on('value', (snapshot) => {
        let postsObject = snapshot.val();
        if (postsObject != null) {
            let postArray = Object.keys(postsObject).map(id => {
                return {
                    id: id,
                    title: postsObject[id].title,
                }
            });
            posts = postArray;
        } else {
            posts = [];
        }
    });

    setInterval(function() {
        console.log(members);
        console.log(posts);
        if (Object.keys(posts).length != 0) {
            console.log('send email');
            members.forEach(member => {
                // One member will always have undefined fields due to the member set we use to
                // enforce unique email addresses
                if (typeof member.email !== "undefined") {
                    sendEmail(member.email, member.firstName, posts)
                }

                // Resetting the reference to the database to only get the past day
                pastDay = new Date().getTime() - (24 * 3600 * 1000);
                postRef = firebase.database().ref('posts').orderByChild('date').startAt(pastDay);
                postRef.on('value', (snapshot) => {
                    let postsObject = snapshot.val();
                    if (postsObject != null) {
                        let postArray = Object.keys(postsObject).map(id => {
                            return {
                                id: id,
                                title: postsObject[id].title,
                            }
                        });
                        posts = postArray;
                    } else {
                        posts = [];
                    }
                });
            });
        } else {
            console.log('no recent posts');
        }
    }, milliseconds_in_day);

    console.log(`server is listening at http://${addr}...`);
});

// Sends recent posts email to the given user.
async function sendEmail(email, name, posts) {
  const mailOptions = {
    from: `Team Gravity <noreply@firebase.com>`,
    to: email,
  };

  mailOptions.subject = `Your Project Gravity Daily Digest`;
  let emailHtml = `<p>Hey ${name || ''}! Below are the Project Gravity posts from today:</p>`
    + posts.map(post => '<br><a href="https://gravity-28052.firebaseapp.com/demo/'+ post.id + '">' + post.title + '</a>').join("") +
    '<br><p>Anything sound interesting? <a href="https://gravity-28052.firebaseapp.com/demo/">Join the discussion!</a></p>';
  mailOptions.html = emailHtml;
  await mailTransport.sendMail(mailOptions);
  console.log('email sent to:', email);
  return null;
}
