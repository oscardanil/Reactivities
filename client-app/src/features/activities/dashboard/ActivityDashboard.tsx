import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetail } from './ActivityDetail'
import { ActivityForm } from '../form/ActivityForm'

interface IProps{
    activities:IActivity[];
    selectActivity:(id:string)=>void;
    selectedtActivity:IActivity | null;
    editMode:boolean;
    setEditMode:(editMode:boolean)=>void;
    setSelectedActivity:(activity:IActivity | null)=>void;
    createActivity:(activity:IActivity)=>void;
    editActivity:(activity:IActivity)=>void;
    deleteActivity:(id:string)=>void;
}

export const ActivityDashboard:React.FC<IProps>= ({activities,
    selectActivity,
    selectedtActivity,
    editMode,setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
}) => {
    return (
      <Grid>
          <Grid.Column width={10}>
          <List >
              <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
          </List>
          </Grid.Column>
          <Grid.Column width={6}>
            {selectedtActivity &&  !editMode &&(
               <ActivityDetail activity={selectedtActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />
            )
 }
{editMode && <ActivityForm 
key={(selectedtActivity && selectedtActivity.id) || 0}
setEditMode={setEditMode} 
activity={selectedtActivity!}
 createActivity={createActivity} 
 editActivity={editActivity} />}
              
          </Grid.Column>
      </Grid>
    )
}
