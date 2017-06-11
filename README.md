# Emotiface (Online Game)
## Project 4 - &#169; Naomi Meyer 

### Description: 
 
A bright and colorful game using facial recognition and emotion detection AI to have fun making faces! 
 
Useful and fun for people with autism and/or asperger's to learn and practice emotional recognition.
 
### App Flow/Pseudo Code:

1. Display opening landing page with instructions and start button
2. Player clicks start button
3. Modal pop up window appears
4. Pop-up contains the name and emoticon for a random emotion for a set amount of time (~3 seconds)
    - Emotion options include: (a. Happy, b. Sad, c. Surprised, d. Angry)
5. Then, live webcam video is turned on
6. Player has a set amount of time (~3 seconds) to make a face conveying the emotion from the prompt
7. Display the score of emotion, as returned from AI, on the screen
  - MVP - If correct emotion is detected, player gets a point
  - Post-MVP - different point values for different score of emotion, returned from the Emotion Recognition API AI (ex: if 90% happy = +2pts, elsif 60% happy = +1pt) 
8. If correct emotion is not detected, player does not get a point
9. Repeat steps 3-8 for a set amount of time (~30 seconds) per round
10. Display closing landing page with: total score and button to play again

### Wire Frames:

#### Home/Start Landing Page:

![wire-frame](/images/wf-startlanding.png)

#### Game In Play - Emotion to do screen:

![wire-frame](/images/wf-emotiontodo.png)

#### Game In Play - Current Face (with webcam):

![wire-frame](/images/wf-currentface.png)

#### End/Final Score Landing Page:

![wire-frame](/images/wf-endlanding.png)

### Tech Stack:

#### Core Stack:
- Node & Express back end
- React front end (MVP, but post-MVP would like to convert to React Native)
- HTML
- CSS
- jQuery
- Ajax
- Git

#### JavaScript Libraries:
- https://github.com/auduno/clmtrackr

![clmtrackr](/images/clmtrackr.png)

#### Emotion Detection tools:
- Lambdal Facial Recognition API (https://lambdal.com/face-recognition-api#src)

![Lambdal](/images/lambdal.png)

- Microsoft Azure Cognitive Services - Emotion (https://azure.microsoft.com/en-us/services/cognitive-services/emotion/)

![microsoft-azure](/images/microsoft-azure.png)

- Google Cloud Vision Facial Recognition AI SDK (https://cloud.google.com/vision/) (maybe)

![google-vision](/images/google-vision.png)

- Affectiva Emotion SDK (https://affectiva.readme.io/docs/getting-started-with-the-emotion-sdk-for-the-cloud) (maybe)
- Clarifai Video Recognition AI SDK (https://developer.clarifai.com/guide/public-models#public-models) (maybe)
