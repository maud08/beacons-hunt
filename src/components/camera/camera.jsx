import React, {useRef} from "react";
import {useEffect} from "react";

function Camera() {


    const videoRef = useRef(null); 
    const photoRef = useRef(null);
    const stripRef = useRef(null)
    const width = 320;
    const height = 240;

    const constraints = {
        audio: false,
        height: 9999,
        video: {facingMode: 'environment'}
      };


    
    const getVideo = () => {
        if(navigator.mediaDevices){
            navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => { 
            let video = videoRef.current;
            video.srcObject= stream;
            video.play();
            }).catch(err => {
                console.log("error", console.log(err))
            });
        }else{
            navigator.webkitGetUserMedia.getUserMedia(constraints)
            .then(stream => { 
            let video = videoRef.current;
            video.srcObject= stream;
            video.play();
            }).catch(err => {
                console.log("error", console.log(err))
            });
        }
        
        
    };

    

    const paintToCanvas = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");
        photo.width = width;
        photo.height = height;

        console.log("context", ctx)
        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
        }, 200)
    }

    

    const stop = (e) => {
        let video = videoRef.current;
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop();
        }

        video.srcObject = null;
    }

    const takePhoto = () => {
        let photo = photoRef.current;
        let strip = stripRef.current;

        const data = photo.toDataURL("image/jpeg");

        const link = document.createElement("a");
        link.href = data;
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
        strip.insertBefore(link, strip.firstChild);
    };


    /**
     * UseEffect
     */

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return (
        <>{
            'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices && 
            <div>
                <button onClick={
                    () => takePhoto()
                }>Prendre la photo</button>
                <video ref={videoRef}
                    onPlay={
                        () => paintToCanvas()
                    }/>
                <canvas ref={photoRef}
                    className="imgCanvas"/>
                <div ref={stripRef}/>
            </div>
        } </>
    )
}

export default Camera;
