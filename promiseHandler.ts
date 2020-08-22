// function callMe(name: any) {
//     name = "processedName"
//     console.log(name)
//     return 'done'
// }

// function otherThing(callMe: Function) {
//     return callMe("test")
// }

// console.log(otherThing(callMe))


function createPromise() {
    let res: any
    let rej: any
    const promise = new Promise<string>(function(resolve, reject) {
        res = resolve
        rej = reject
    }) 

    return {res, rej, promise}
}

function post(data: any) {
    //setup promiseReject&Resolve
    const { res, rej, promise } = createPromise()
    for (var item in data) {
        if (data[item] == 1) {
            console.log("Ok")
        } else {
            rej('Error')
            return promise;
        }
    }

    if (data.length == 3) {
        rej('Example error')
        return promise
    } else {
        console.log('Ok')
    }

    //at this point all function data has been processed, return success information here

    res('Everything has completed') //this will break function execution and return to the .then attatched to the function caller 

    return promise
}

function anotherAfterPost(data: any) { 
    console.log("second functions received data:", data)
    return 'Second functions response data'
}

async function handle() {
    try {
        await post([1, 1])
        .then(response => anotherAfterPost(response)).then(response2 => console.log(response2)) //called if success (you can redirect here or call another function).
        .catch(err => { //error handler for the entire post function :)
            console.log('Data error:', err)
        })
    } catch {
        console.log('Function error')
    }

}

handle()


//install typscript to run. Use npx ts-node promiseHandler.ts (in the same dir to run)