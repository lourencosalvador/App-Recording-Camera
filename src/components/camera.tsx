"use client"
import React, { useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';


const CameraRecorder = () => {


    const videoRef = useRef<HTMLVideoElement>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const chunksVideo = useRef<Blob[]>([]);


    useEffect(() => {

        initializeMediaStream();

    }, []);


    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setTimeout(startRecording, 2000);
        }
    };

    const startRecording = () => {
        initializeMediaStream();
    };

    const initializeMediaStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    chunksVideo.current.push(event.data);
                    console.log("estou on")
                }
            });

            mediaRecorder.addEventListener('stop', () => {
                const recordedBlob = new Blob(chunksVideo.current, { type: 'video/webm' });
                chunksVideo.current = [];
                saveAs(recordedBlob, `camera-recording-${new Date().toISOString()}.webm`);
            });

            mediaRecorder.start();
            setTimeout(stopRecording, 20000);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        startRecording();

    }, []);

    return (
        <div>
            <video ref={videoRef} width="640" height="480" autoPlay />
        </div>
    );
};

export default CameraRecorder;