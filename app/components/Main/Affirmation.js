/* 
	AFFIRMATION MODEL
	CREATED BY FELIX HUSEN
*/

// realm import
import Realm from 'realm';

export class Affirmation {
  static get() { return realm.objects(Affirmation.schema.name) }
  static schema = {
    name: 'Affirmation',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      category_id: {type: 'int'},
      text: {type: 'string'},
      image_path: {type: 'string'},
      voice_path: {type: 'string'},
      position: {type: 'int'}
    }
  }
}

