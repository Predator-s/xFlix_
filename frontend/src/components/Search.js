
let urlId = 'http://localhost:8082'

async function getVideos(genre){
    let url = `${urlId}/v1/videos?genres=${genre}`;
    try {
        let response=await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }

}

async function uploadVideo(videoData){
    let url=`${urlId}/v1/videos`;
    let body={
        videoLink: videoData.VideoLink,
        title: videoData.Title,
        genre:videoData.Genre,
        contentRating: videoData.ageGroup,
        releaseDate:videoData.releaseDate,
        previewImage:videoData.ThumbnailLink,
    }
    await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',                                                              
        body: JSON.stringify( body )                                        
      })

    await getAllVideos

}


async function getAllVideos(sate) {
    
    console.log(`Faisal-${sate}`)
    let url='/v1/videos?'
    if(sate.title){
        url=url+'title='+sate.title+'&'

    }
    if(sate.genres){
        console.log(typeof sate.genres)
        console.log(sate.genres)
        let genArry=[...sate.genres];
        if(genArry.indexOf("All")===-1){
            let genrearry=(sate.genres).join(',')
            url=url+'genres='+genrearry+'&'
        }
          
    }

    if(sate.contentRating!=="Anyone"){
        let decodedstr = encodeURIComponent(sate.contentRating);
        let decodedstr2 = encodeURI("2+");
        console.log(decodedstr, decodedstr2)
        url=url+'contentRating='+decodedstr+'&'
    }

    if(sate.sortBy){
        url=url+'sortBy='+sate.sortBy
    }
    try {
        let urlfinal = `${urlId}${url}`
        let response = await fetch(urlfinal);
        return await response.json()
    } catch (err) {
        return null
    }
}

async function upvote(id){
    let url=`${urlId}/v1/videos/${id}/votes`;
    let body={
        vote: "upVote",
        change: "increase"
    }
    await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH',                                                              
        body: JSON.stringify( body )                                        
      })
}

async function downvote(id){
    let url=`${urlId}/v1/videos/${id}/votes`;
    let body={
        vote: "downVote",
        change: "increase"
    }
    await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH',                                                              
        body: JSON.stringify( body )                                        
      })
}




export  { getAllVideos, upvote, downvote, getVideos, uploadVideo } 