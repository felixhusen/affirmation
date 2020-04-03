/*
    DATABASE HANDLER MODULE
    CREATED BY FELIX HUSEN
    USING REALM@2.2.0
*/

// import main models
import { Affirmation } from './Affirmation';
import { Category } from './Category';
// realm import
const Realm = require('realm');

const databaseOptions = {
  schema: [Category.schema, Affirmation.schema],
  schemaVersion: 0
}

const realm = new Realm(databaseOptions);

const CATEGORY = 'Category';
const AFFIRMATION = 'Affirmation';

export default class DatabaseHandler {

    constructor() {
        // bind methods
        this.addCategory = this.addCategory.bind(this);
        this.addCategories = this.addCategories.bind(this);
        this.initializeDefaultCategories = this.initializeDefaultCategories.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.clearDatabase = this.clearDatabase.bind(this);
        this.initialize = this.initialize.bind(this);
        this.updateCategoriesPosition = this.updateCategoriesPosition.bind(this);
        this.getPrimaryKeyId = this.getPrimaryKeyId.bind(this);
        this.getCategoryPrimaryKey = this.getCategoryPrimaryKey.bind(this);
        this.getAffirmationPrimaryKey = this.getAffirmationPrimaryKey.bind(this);
        this.initializeDefaultAffirmation = this.initializeDefaultAffirmation.bind(this);
        this.addAffirmation = this.addAffirmation.bind(this);
        this.updateAffirmation = this.updateAffirmation.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.getAffirmations = this.getAffirmations.bind(this);
        this.getAllAffirmations = this.getAllAffirmations.bind(this);
    }

    initialize() {
        // retrieve all categories
        let categories = realm.objects('Category');
        // run the initialize categories method if null or does not exist
        if (categories.length == 0 || categories == null) {
            // initialize default categories
            this.initializeDefaultCategories();
            this.initializeDefaultAffirmation();
            console.log('initializing default category..');
        }

    }

    initializeDefaultCategories() {
        var defaultCategories = require('../../assets/db/DefaultCategory.json');
        this.addCategories(defaultCategories);
    }

    initializeDefaultAffirmation() {
        var defaultAffirmations = require('../../assets/db/DefaultAffirmation.json');
        this.addAffirmations(defaultAffirmations);
    }

    getPrimaryKeyId(model) {
        if (realm .objects(model).max("id")) {
          return realm.objects(model).max("id") + 1;
        }
        return 1;
    }

    getCategoryPrimaryKey() {
        return this.getPrimaryKeyId(CATEGORY);
    }

    getAffirmationPrimaryKey() {
        return this.getPrimaryKeyId(AFFIRMATION);
    }

    /**
     * 
     * @param {*} category 
     * Format:
     * title : string
     * image_path: string {optional}
     * position: int {optional}
     */

    async addCategory(category) {
        try {
            realm.write(() => {
                realm.create(CATEGORY, category);
            });
        } catch (e) {
            console.log("Error creating category!");
        }
    }

    async updateCategory(category) {
        try {
            realm.write(() => {
                realm.create(CATEGORY, category, true);
            });
        } catch (e) {
            console.log("Error updating category!");
        }
    }

    async addAffirmation(affirmation) {
        try {
            realm.write(() => {
                realm.create(AFFIRMATION, affirmation);
            });
        } catch (e) {
            console.log("Error creating affirmation!");
        }
    }

    async addAffirmations(affirmations) {
        // add each of category in the array
        for (let affirmation of affirmations) {
            this.addAffirmation(affirmation);
        }
    }

    async updateAffirmation(affirmation) {
        try {
            realm.write(() => {
                realm.create(AFFIRMATION, affirmation, true);
            });
        } catch (e) {
            console.log("Error updating affirmation!");
        }
    }

    /**
     * 
     * @param {*} category[]
     *
     */

    async addCategories(categories) {
        // add each of category in the array
        for (let category of categories) {
            this.addCategory(category);
        }
    }

    async updateCategoriesPosition(categories) {
        console.log('categories...');
        console.log(categories);
        for (var i = 0; i < categories.length; i++) {
            try {
                realm.write(() => {
                    let category = categories[i];
                    category.position = i;
                    realm.create(CATEGORY, category, true);
                });
            } catch (e) {
                console.log("Error updating category!");
            }
        }
        console.log('updated...');
        console.log(categories);
    }

    async updateAffirmationsPosition(affirmations) {
        for (var i = 0; i < affirmations.length; i++) {
            try {
                realm.write(() => {
                    let affirmation = affirmations[i];
                    affirmation.position = i;
                    realm.create(AFFIRMATION, affirmation, true);
                });
            } catch (e) {
                console.log("Error updating category!");
            }
        }
    }

    async getCategories() {
        return realm.objects(CATEGORY).sorted('position');
    }

    getCategory(primaryKey) {
        return realm.objects(CATEGORY).filtered('id = ' + primaryKey);
    }

    async getAllAffirmations() {
        return realm.objects(AFFIRMATION);
    }

    async getAffirmations(category) {
        console.log('all affirmations');
        console.log(this.getAllAffirmations().length);
        console.log('getaff');
        console.log(category);
        return realm.objects(AFFIRMATION).filtered('category_id = ' + Number(category.id)).sorted('position');
    }

    async deleteCategory(category) {
        try {
            realm.write(() => {
                // get all affirmations from that category
                let affirmations = realm.objects(AFFIRMATION).filtered('category_id = ' + Number(category.id));
                // delete all affirmations
                realm.delete(affirmations);
                // delete the category
                realm.delete(category);

            });
        } catch (e) {
            console.log("Error deleting category!");
        }
    }

    async deleteAffirmation(affirmation) {
        try {
            realm.write(() => {
                // delete affirmations
                realm.delete(affirmation);
            });
        } catch (e) {
            console.log("Error deleting category!");
        }
    }

    async clearDatabase() {
        // clear all categories & affirmation
        try {
            realm.write(() => {
                let categories = realm.objects(CATEGORY);
                let affirmations = realm.objects(AFFIRMATION);
                // delete all affirmations
                realm.delete(affirmations);
                // delete the category
                realm.delete(categories);
            });
        } catch (e) {
            console.log("Error deleting category!");
        }
        
    }
    
}