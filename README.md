<a name="gobackhere">

# Emotiface (Web App/Game)
## Project 4 - &#169; Naomi Meyer 

![logo](/images/logo.png)

</a>

## Table of Contents:

1. [App/Game description](#appdescription)
2. [App Flow Chart] (#appflow)
3. [App Flow/Pseudo Code] (#pseudocode)
4. [User Stories](#userstories)
5. [Wireframes](#wireframes)
6. [Tech Stack](#techstack)
7. [API Research] (#apiresearch)
7. [See Project](#seeproject)

<a name="appdescription">

### App/Game Description: 
 
A bright and colorful game using facial recognition and emotion detection AI to have fun making faces! 
 
Useful and fun for people with autism and/or asperger's to learn and practice emotional recognition.

</a>

<a name="appflow">

### App Flow Chart:

![app-flow](/images/app-flow.png)

</a>

<a name="pseudocode">

### App Flow/Pseudo Code:

1. Display opening landing page with instructions and start button
2. Player clicks start button
3. Live webcam video is turned on
6. Player makes a face conveying an extreme emotion
7. If face is found (from facial recognition detection) -> then display the score of each emotion, as returned from AI, in a pop up modal window
8. If face is NOT found (from facial recognition detection) -> then alert user the face was not found, and refresh the screen to allow user to try again

</a>

<a name="userstories">

### User Stories:

Target User Demographic = young people with Autism or Asperger's who want to practice reading facial expressions and figuring out  emotions from different expressions. 

1. As a user, I want to play a game with bright fun colors and simple, easy to understand button prompts.
2. As a user, I want to take a photo of a face and see what emotions are found from that face.
3. As a user, I want to play simply for my own personal enjoyment and edification. I don't want scores or competition.
4. As a user, I want to see emoticons for each emotion checked so I can understand why that emotion was found, from the picture I took.
5. As a user, I want to know if no face was found in the picture and be able to quickly and easily take another picture. 

</a>

<a name="wireframes">

### Wire Frames:

#### Home/Start Landing Page:

![wire-frame](/images/wf-startlanding.png)

#### Game In Play - Current Face (with webcam):

![wire-frame](/images/wf-currentface.png)

</a>

<a name="techstack">

### Tech Stack:

#### Core Stack:
- React
- Node
- Express
- HTML
- CSS
- jQuery
- Ajax
- Git
- PostgreSQL
- AWS

#### Middleware:
- React Webcam
- React-Bootstrap
- Isomorphic fetch
- Axios
- pg-promise
- bluebird

#### APIs:
- Cloudinary
- Kairos Facial Recognition API
- Kairos Emotion Detection API

</a>

<a name="apiresearch">

### Facial Recognition/Emotion Detection Research:

#### JavaScript Libraries:
- https://github.com/auduno/clmtrackr

![clmtrackr](/images/clmtrackr.png)

#### Emotion Detection tools:
- Lambdal Facial Recognition API (https://lambdal.com/face-recognition-api#src)

![Lambdal](/images/lambdal.png)

- Microsoft Azure Cognitive Services - Emotion (https://azure.microsoft.com/en-us/services/cognitive-services/emotion/)

![microsoft-azure](/images/microsoft-azure.png)

- Google Cloud Vision Facial Recognition AI SDK (https://cloud.google.com/vision/)

![google-vision](/images/google-vision.png)

- Affectiva Emotion SDK (https://affectiva.readme.io/docs/getting-started-with-the-emotion-sdk-for-the-cloud)
- Clarifai Video Recognition AI SDK (https://developer.clarifai.com/guide/public-models#public-models)

</a>

<a name="seeproject">

## See the project here:

### Live Deployment of App: www.naeohmi.github.io/emotiface

### Download Project & Install

1. Git clone or download this project
2. Make sure to `npm install`
3. Cd to the `react` folder
4. Run `npm start` and app should be available on localhost:3000

Thanks :) 

![app-logo](/images/logo.png)

</a>

[Go Back to Table of Contents](#gobackhere)