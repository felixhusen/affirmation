const DefaultCategoryImage = {
    happiness: require('../../assets/imgs/Folder_Category_images/Happiness_Folder_Image3.jpg'),
    health: require('../../assets/imgs/Folder_Category_images/Health_Folder_Image1.jpg'),
    success: require('../../assets/imgs/Folder_Category_images/Success_Folder_Image1.jpg'),
    wealth: require('../../assets/imgs/Folder_Category_images/Wealth_Folder_Image.jpg'),
    relationship: require('../../assets/imgs/Folder_Category_images/Relationship_Folder_Image4.jpg'),
    weightLoss: require('../../assets/imgs/Folder_Category_images/Weighloss_Folder_Image4.jpg'),
};

// parse image function
function parseImage(name) {
	var imageURI;
    if (name == 'happiness') {
        imageURI = DefaultCategoryImage.happiness;
    } else if (name == 'health') {
        imageURI = DefaultCategoryImage.health;
    } else if (name == 'success') {
        imageURI = DefaultCategoryImage.success;
    } else if (name == 'wealth') {
        imageURI = DefaultCategoryImage.wealth;
    } else if (name == 'relationship') {
        imageURI = DefaultCategoryImage.relationship;
    } else if (name == 'weightLoss') {
        imageURI = DefaultCategoryImage.weightLoss;
    } else {
        if (JSON.parse(name)) {
            imageURI = JSON.parse(name);
        } else {
            imageURI = name;
        }
    }
    return imageURI;
}

function getDefaultImages() {
    let imageArray = [];
    for (var i = 0; i < 73; i++) {
        let item = { uri: 'img' + (i + 1)};
        imageArray.push(item);
    }
    return imageArray;
}

const defaultCategoryImages = [{value: 'happiness', label: 'Happiness'}, {value: 'health', label: 'Health'},
{value: 'success', label: 'Success'}, {value: 'wealth', label: 'Wealth'},
{value: 'relationship', label: 'Relationship'}, {value: 'weightLoss', label: 'Weight Loss'}];

export { parseImage, DefaultCategoryImage, defaultCategoryImages, getDefaultImages }