/* 
	CATEGORY MODEL
	CREATED BY FELIX HUSEN
*/

// realm import
import Realm from 'realm';

export class Category {
  static get() { return realm.objects(Category.schema.name) }
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      title: {type: 'string'},
      image_path: {type: 'string', optional: true},
      position: {type: 'int', optional: true, default: 0}
    }
  }
}

