 // minimizing the network request to improve performance
 // Will return the cache data if the api call is being made within the cache session time 

 const cachedApiCall = (time)=>{
    const cache ={};
    // returning async function because we are doing asynchronous operation such as calling fetch method 
    return async(url,config={})=>{
        const key= `${url}${JSON.stringify(config)}`
        const entry = cache[key];
        if(!entry || Date.now() > entry.expiry)
        {
            console.log("Making fresh API call")
            try {
                let resp= await fetch(url , config);
                // resp.json() method to convert JSON data into javascript object
                resp = await resp.json();
                // adding a new response and expiry time into the cache 
                cache[key]= { value:resp , expiry :Date.now() + time}
            } catch (error) {
                console.log("error while making API call")
            }
        }
        return cache[key].value
    }
 }
// all the setTimeout runs parallelly  not not in sequence. 
 const call = cachedApiCall(1500);
 call("https://jsonplaceholder.typicode.com/todos/1",{}).then((data)=>{
    console.log("First call ",data)
 })

 setTimeout(()=>{
    call("https://jsonplaceholder.typicode.com/todos/1",{}).then((data)=>{
        console.log("2nd call",data)
    })
 },800)
 setTimeout(()=>{
    call("https://jsonplaceholder.typicode.com/todos/1",{}).then((data)=>{
        console.log("3rd call",data)
    })
 },1800)