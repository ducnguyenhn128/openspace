const processHashtag = (input) => {
    // Remove symbols and spaces
    const cleanedString = input.replace(/[^a-zA-Z0-9,]/g, '').replace(/\s+/g, '');
  
    // Convert to lowercase
    const lowercaseString = cleanedString.toLowerCase();
    // console.log(lowercaseString)
    // Split by dot (',')
    const splitArray = lowercaseString.split(',');
    const result = splitArray.filter(el => el !== '')
    console.log(result)
    return result;
  };

// const str = 'news,    sport****, seagaeme ,'
// processHashtag(str)

module.exports = processHashtag

//This function: hashtag => array