/**
 * DATE: 12-08-2024
 * PROJECT: COLOR PICKER APPLICATION
 * AUTHOR: ABDUL MALIK
 */

// window on load function
window.onload = () =>{
 main()
}

// MIAN FUNCTION
function main(){
    const generateBtn = document.getElementById('generate__color')
    const hexColor = document.getElementById('hexColor')
    const rgbColor = document.getElementById('rgbColor')
    const copyColor = document.getElementById('copyColor')
    const coppiedMsg = document.getElementById('coppiedMsg')
    // COLOR RANGE SELECTOR
    const redColorRange = document.getElementById('colorVolume__red')
    const greenColorRange = document.getElementById('colorVolume__green')
    const blueColorRange = document.getElementById('colorVolume__blue')

    // COLOR MODE COPY SELECTION
    const hexColorMode = document.getElementById('hex__colorMode')
    const rgbColorMode = document.getElementById('rgb__colorMode')


    // GENERATE BUTTON ON CLICK EVENT
    generateBtn.addEventListener('click', colorGeneratorBtnHandaler)

    // INPUT COLOR ON EDIT EVENT
    hexColor.addEventListener('keyup',function(eventValue){
        const backgoundChange = document.getElementById('rendom__bg_color')
        const rgbColor = document.getElementById('rgbColor')
        const hexColorCode = eventValue.target.value

        if(hexColorCode){
            hexColor.value = hexColorCode.toUpperCase()
            if(isValidColor(hexColorCode)){
                const hexToDecimalCode = hexToRgbgGenerate(hexColorCode)
                const rgbColorGen = generateRgbColor(hexToDecimalCode)
                backgoundChange.style.backgroundColor = `#${hexColorCode}`
                rgbColor.value = `(${rgbColorGen})`
            }
        }

    })


    // COLOR RANGE ON CHANGE EVENT
    redColorRange.addEventListener('change', colorRangeHandaler(redColorRange,greenColorRange,blueColorRange))
    greenColorRange.addEventListener('change', colorRangeHandaler(redColorRange,greenColorRange,blueColorRange))
    blueColorRange.addEventListener('change', colorRangeHandaler(redColorRange,greenColorRange,blueColorRange))

    // // COPY COLOR CODE BASED ON SELECTION
    copyColor.addEventListener('click',function(){
        if(hexColorMode.selected){
            navigator.clipboard.writeText(`#${hexColor.value}`)
            // console.log(`#${hexColor.value}`)
            coppiedMsg.style.display = 'block'
            setTimeout(function(){
                coppiedMsg.style.display = 'none'
            },400)
        }else{
            window.navigator.clipboard.writeText(`rgb${rgbColor.value}`)
            coppiedMsg.style.display = 'block'
            setTimeout(function(){
                coppiedMsg.style.display = 'none'
            },400)
        }
    })


}

// EVENT HANDELAR FUNCTION

// COLOR CODE HANDALER
function colorGeneratorBtnHandaler(){
    const decimalCode = generateDecimalNumber()
    updateDom(decimalCode)
}

// COLOR RANGE HANDALER
function colorRangeHandaler(redColorRange,greenColorRange,blueColorRange){
    return function(){
        const color ={
            red: parseInt(redColorRange.value),
            green:parseInt(greenColorRange.value),
            blue: parseInt(blueColorRange.value)
        }
    
        return updateDom(color)
    }
}



// DOM FUNCTION
/**
 * update dom elements
 * @param {string} color 
 */
function updateDom(color){
    const backgoundChange = document.getElementById('rendom__bg_color')
    const hexColor = document.getElementById('hexColor')
    const rgbColor = document.getElementById('rgbColor')

    // COLOR RANGE SELECTOR
    const redColorRange = document.getElementById('colorVolume__red')
    const greenColorRange = document.getElementById('colorVolume__green')
    const blueColorRange = document.getElementById('colorVolume__blue')
    // Updating value
    const hexColorCode = generateHexColor(color)
    const rgbColorCode = generateRgbColor(color)
    backgoundChange.style.backgroundColor = `#${hexColorCode}`
    hexColor.value = hexColorCode
    rgbColor.value = `(${rgbColorCode})`

    // UPDATE COLOR RANGE WHEN CLICLED ON GENERATE BTN
    redColorRange.value = color.red
    greenColorRange.value = color.green
    blueColorRange.value = color.blue
}


// UTILITIES FUNCTION
/**
 * GENERATING DECIMAL NUMBER
 * @param {string} 
 * @returns {object}
 */
function generateDecimalNumber(){
    const red = Math.floor(Math.random()*255)
    const green = Math.floor(Math.random()*255)
    const blue = Math.floor(Math.random()*255)
    return{
        red,
        green,
        blue
    }
}

/**
 * GENERATING HEX CODE
 * @param {string} 
 */
function generateHexColor({red,green,blue}){
    function generateTwoCode(value){
        const twoHexCode = value.toString(16)
        return twoHexCode.length == 1? `0${twoHexCode}` : twoHexCode
    }
    return `${generateTwoCode(red)}${generateTwoCode(green)}${generateTwoCode(blue)}`
}

/**
 * GENERATING RGB CODE
 * @param {string} 
 */

function generateRgbColor({red,green,blue}){
    return `${red},${green},${blue}`
}

/**
 * HEX TO RGB CODE GENERATOR
 * @param {string} hexColor
 * @returns {object}
 */

function hexToRgbgGenerate(hexColor){
   const red = parseInt(hexColor.slice(0,2),16)
   const green = parseInt(hexColor.slice(2,4),16)
   const blue = parseInt(hexColor.slice(4),16)

   return{
    red,
    green,
    blue
   }

}

/**
 * VALIDATION CHECKING
 * @param {string} 
 */

// Input validation function
/**
 * 
 * @param {string} color 
 */
function isValidColor(color) {
    // checking lenght
    if (color.length !== 6) return false;
    // RegExp (REGULAR EXPRESSION)
    return /^[1-9A-Fa-f]{6}$/i
}
