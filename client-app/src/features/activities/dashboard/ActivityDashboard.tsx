import React, { SyntheticEvent } from 'react'
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
    deleteActivity:(e:SyntheticEvent<HTMLButtonElement>,id:string)=>void;
    submitting:boolean;
    target:string;
}

export const ActivityDashboard:React.FC<IProps>= ({activities,
    selectActivity,
    selectedtActivity,
    editMode,setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target
}) => {
    return (
      <Grid>
          <Grid.Column width={10}>
          <List >
              <ActivityList activities={activities} 
              selectActivity={selectActivity}
              deleteActivity={deleteActivity}
              submitting={submitting}
              target={target} />
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
 editActivity={editActivity}
 submitting={submitting} />}
              
          </Grid.Column>
      </Grid>
    )
}
