import React, { useState } from 'react'
import Amplify, { Storage } from 'aws-amplify'
import {
    AmplifyAuthenticator,
    AmplifySignIn,
    AmplifySignUp,
} from '@aws-amplify/ui-react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LinearProgress from '@material-ui/core/LinearProgress';
const { v4: uuidv4 } = require('uuid');
import awsConfig from '../../aws-exports'

Amplify.configure(awsConfig)


const Uploader = () => {
    const [name, setName] = useState('')
    const [file, setFile] = useState('')
    const [response, setResponse] = useState('')
    const [isUploading, setIsUploading] = useState('')

    const onChange = (vidUpload) => {
        vidUpload.preventDefault()
        if (vidUpload.target.files[0] !== null) {
            setFile(vidUpload.target.files[0])
            setName(vidUpload.target.files[0].name)
        }
    }

    const onSubmit = (vidUpload) => {
        vidUpload.preventDefault()
        if (file) {
            const s3Bucket = "https://rckeeluploadvideobuckettest1113114-dev.s3.amazonaws.com/"
            const randomID = uuidv4()
            const randomName = `${randomID}${file.type}`
            const name = randomName.replace("video/", ".")
            const videoURL = `${s3Bucket}${name}`
            console.log('file:', videoURL)

            Storage.put(name, file, {
                /* level: 'protected', */
                contentType: file.type,
            })
                .then((result) => {
                    console.log(result)
                    console.log('name:', name)
                    setResponse(`Success uploading file: ${name}!`)
                })
                .then(() => {
                    document.getElementById('file-input').value = null
                    setFile(null)
                })
                .catch((err) => {
                    console.log(err)
                    setResponse(`Can't upload file: ${err}`)
                })
        } else {
            setResponse(`Files needed!`)
        }
    }

    return (
        <Grid
            item
            style={{ width: '400px' }
            }
        >
            <AmplifyAuthenticator>
                <AmplifySignIn
                    headerText='Please Login'
                    slot='sign-in'
                />
                <AmplifySignUp
                    headerText='Signups Are Closed At This Time'
                    slot='sign-up'
                />
                <div className='header' >
                    <h2>
                        Video Uploader
            < /h2>
            < /div>
            < Grid
                            className='video-uploader'
                            mb={2}
                        >
                            <form
                                onSubmit={(e) => onSubmit(e)}>
                                <p>

                                </p>

                                {
                                    file ? (<video src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} width="400px" />) :
                                        (<p></p>)}
                                < Grid
                                    justify="space-between"
                                    container
                                >
                                    <label className='video-input' >
                                        <input
                                            style={{ display: 'none' }}
                                            type="file"
                                            id='file-input'
                                            accept='video/*'
                                            onChange={(vidUpload) => onChange(vidUpload)
                                            }
                                        />

                                        < Button
                                            color="primary"
                                            variant="contained"
                                            component="span"
                                            startIcon={< ImageSearchIcon />}
                                        >
                                            Choose Video
        < /Button>
        < /label>
        < Button
                                                type='submit'
                                                className='btn'
                                                variant="contained"
                                                color="primary"
                                                startIcon={< CloudUploadIcon />}
                                                onClick={() => isUploading.setState({ type: 1 })}
                                            > Submit
    < /Button>
    < /Grid>
    < Grid
                                                    justify="space-between" // Add it here :)
                                                    container
                                                >
                                                    <TextField
                                                        id="region"
                                                        label="Region"
                                                        size="small"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    < TextField
                                                        id="date"
                                                        label="Date"
                                                        type="date"
                                                        defaultValue="2017-05-24"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    < /Grid>


    < /form>
      {isUploading && !response ? (< LinearProgress />) :
                                                        (<p></p>)}

                                                </Grid>
                                                {
                                                    response && (
                                                        <div id='upload-status' className='upload-status' >
                                                            { response}
                                                            < /div>
                )
}

                                                            <div className='sign-out' >

                                                            </div>
                                                            < /AmplifyAuthenticator>
                                                            < /Grid >
    )
}


export default Uploader