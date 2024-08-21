/**
 * DATE: 12-08-2024
 * PROJECT: COLOR PICKER APPLICATION
 * AUTHOR: ABDUL MALIK
 */



// COLOR PRESETS
const colorPreset =[
    '#e6b0aa',
    '#d7bde2',
    '#d2b4de',
    '#a9cce3',
    '#a3e4d7',
    '#abebc6',
    '#f9e79f',
    '#fad7a0',
    '#d5dbdb',
    '#aeb6bf',
    '#abb2b9',
    '#273746',
    '#616a6b',
    '#d68910',
    '#2874a6',
    '#943126',
    '#fad7a0',
    '#d5dbdb',
    '#aeb6bf',
    '#a3e4d7'

];
const displayColorPreset = document.getElementById('color__preset')

// window on load function
window.onload = () =>{
    main()
    generateColorPreset(colorPreset)
    // createPrecetDomElement()
}



// COLOR MODE COPY SELECTION
const hexColorMode = document.getElementById('hex__colorMode')
const rgbColorMode = document.getElementById('rgb__colorMode')
const coppiedMsg = document.getElementById('coppiedMsg')

// MIAN FUNCTION
function main(){
    const generateBtn = document.getElementById('generate__color')
    const hexColor = document.getElementById('hexColor')
    const rgbColor = document.getElementById('rgbColor')
    const copyColor = document.getElementById('copyColor')

    // COLOR RANGE SELECTOR
    const redColorRange = document.getElementById('colorVolume__red')
    const greenColorRange = document.getElementById('colorVolume__green')
    const blueColorRange = document.getElementById('colorVolume__blue')

    // GENERATE BUTTON ON CLICK EVENT
    generateBtn.addEventListener('click', colorGeneratorBtnHandaler)

    // INPUT COLOR ON EDIT EVENT
    hexColor.addEventListener('keyup',hexCodeInputEventHenaler)

    // COLOR RANGE ON CHANGE EVENT
    redColorRange.addEventListener('change', colorRangeHandaler(redColorRange,greenColorRange,blueColorRange))
    greenColorRange.addEventListener('change', colorRangeHandaler(redColorRange,greenColorRange,blueColorRange))
    blueColorRange.addEventListener('change', colorRangeHandaler(redColorRange,greenColorRange,blueColorRange))

    // // COPY COLOR CODE BASED ON SELECTION
    copyColor.addEventListener('click',copyButtonClickEventHendaler)

    // COLOR PRESET CODE COPY EVENT
    displayColorPreset.addEventListener('click',presetColorCopyHandel)
    

}

// EVENTS HANDELARS


// COLOR PRESET CODE COPY EVENT HENDELAR
function presetColorCopyHandel(){
    const chileColors = event.target
    if(chileColors.className == 'color__box'){
        navigator.clipboard.writeText(chileColors.getAttribute('data-color'))
        const message = chileColors.children
        message[0].style.display = 'block'
        setTimeout(function(){
            message[0].style.display = 'none'
        },400)

    }

}
// COLOR CODE GENERATOR BUTTON HANDALER
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

// HEX CODE INPUT FILED EDIT EVENT HENDALER

function hexCodeInputEventHenaler(eventValue){
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
}

function copyButtonClickEventHendaler(){
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

/**
 * CREATE PRECET DOM ELEMENT
 * @param {string} presetColor
 */

function createPrecetDomElement(colorCode){
    const div = document.createElement('div')
    const span = document.createElement('span')

    // set class name
    div.className = 'color__box'
    span.className = 'copy_msg'
    span.id = 'copy_msg'
    span.innerHTML = 'Coppyed!'
    // const dataColor = colorCode
    // set attributes
    div.setAttribute('data-color',`${colorCode}`)
    // PUSH SPAN on DIV
    div.appendChild(span)
    div.style.backgroundColor = colorCode
    // console.log(colorCode)

    displayColorPreset.appendChild(div)
    return displayColorPreset
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
 * GENERATING COLOR PRESET FROM ARRAY
 * @param {Array} color
 */

function generateColorPreset(color){
  return color.forEach((colorValue,index)=>{
        createPrecetDomElement(`${colorValue}`)
        // console.log(`'${colorValue}'`)
    })
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
