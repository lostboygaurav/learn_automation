
async function Gaurav(a) {
    
    await new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log("first")
            reject()
        }, 3000)
    })
    console.log("second")
}

Gaurav(function() { setTimeout(function() {console.log("first")}, 3000) })
