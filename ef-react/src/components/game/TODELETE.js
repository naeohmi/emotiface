 //send data to API to check for current emotion
    checkEmotion(imgUrl) {
        // FROM DOCS:
        let mediaPost = (imgUrl) => {
            const request = new XMLHttpRequest();
            
            request.open('POST', `https://api.kairos.com/v2/media?source=${imgUrl}`);
            
            request.setRequestHeader('app_id', '9399f510');
            request.setRequestHeader('app_key', '4d5769c498c69f04239bb8da41668afe');
            console.log('mediaPost: ', request);
            request.onreadystatechange = function () {
                console.log(this.readyState, 'within on ready state');
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    this.getAllResponseHeaders();
                    
                    if(this.response) {

                        setInterval(5000);
  

                        console.log(this.response);
                        console.log('id: ', this.response.id);
                    }
            };
            // return ID
            //invoke the function with the ID
            // this.mediaGet(id);
        }
            request.send();
        
        }

        let mediaGet = (id) => {
            const request = new XMLHttpRequest();
            // request.open('GET', `https://private-8fc0b-kairos.apiary-mock.com/v2/media/${id}`);
            request.open('GET', `https://api.kairos.com/v2/media/${id}`);
            request.setRequestHeader('app_id', '9399f510');
            request.setRequestHeader('app_key', '4d5769c498c69f04239bb8da41668afe');

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Headers:', this.getAllResponseHeaders());
                    console.log('Body:', this.responseText);
                }
            };
            request.send();
        }
        mediaPost(imgUrl);