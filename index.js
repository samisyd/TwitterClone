
/* this line from https://github.com/uuidjs/uuid?tab=readme-ov-file#readme */
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {tweetsData} from "./data.js"

document.addEventListener('click', function(e){
   
    if (e.target.dataset.likes) {
        handleLikeClick(e.target.dataset.likes)
    }
    else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } 
    else if(e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }

})

function handleTweetBtnClick() {

    const tweetInput = document.getElementById("tweet-input")    
    if (tweetInput.value ) {
        
        let newTweet = {
            handle: `@Scrimba `,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }
        tweetsData.unshift(newTweet)
        render() 
        tweetInput.value = ''
    }
}

function handleLikeClick(tweetId){

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
        
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked 
    render()

}

function handleRetweetClick(tweetId){
    // this returns an array with 1 object, so get the 0th object
    const tweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
   })[0]
   
   if (tweetObj.isRetweeted) {
        tweetObj.retweets--
   } else {
        tweetObj.retweets++
   }
   tweetObj.isRetweeted = !tweetObj.isRetweeted
   render()
}

function handleReplyClick(replyId){
/*
Challenge:
1. Use the uuid stored in 'replyId' to take control 
   of the div containing that tweet’s replies. 
   (Check the HTML string below to remind yourself 
   what id that div will have.)  
2. Toggle the CSS class "hidden" on that div. 
*/
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')    
}    

function getFeedHtml() {      

    let feedHtml = ``
    tweetsData.forEach(function(tweet) { 
        
        let likeIconClass = ''
        if(tweet.isLiked) {
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''
        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }
            
        let repliesHtml = ``

        if (tweet.replies.length > 0) {
            //console.log(tweet.uuid)
            tweet.replies.forEach(function(reply){
                repliesHtml += `<div class="tweet-reply">
                                    <div class="tweet-inner">
                                        <img src="${reply.profilePic}" class="profile-pic">
                                            <div>
                                                <p class="handle">${reply.handle}</p>
                                                <p class="tweet-text">${reply.tweetText}</p>
                                            </div>
                                        </div>
                                </div>
                                `
            })
        }
        feedHtml += `
                    <div class="tweet">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${tweet.uuid}"></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
                    </div>
                    <div id="replies-${tweet.uuid}" class="hidden">
                        ${repliesHtml}
                    </div>   
                </div>
                `
    })
    
    return feedHtml
}
    
function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
    
}

render()


