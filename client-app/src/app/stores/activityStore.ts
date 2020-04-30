import {observable, action,computed, configure, runInAction} from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '../models/activity';
import agent from '../../api/agent';

configure({enforceActions:'always'});

class ActivityStore{
  @observable ActivityRegistry= new Map();
  @observable selectedActivity:IActivity|undefined;
  @observable LoadingInitial=false;
  @observable editMode=false;
  @observable submitting=false;
  @observable target='';

  @computed get activitiesByDate (){
     return Array.from(this.ActivityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
  }

  @action loadActivities= async()=>{
      this.LoadingInitial=true;

      try {
        const activities=await agent.Activities.list();
        runInAction('Loading Activities',()=>{
          activities.forEach((activity)=>{
            activity.date=activity.date.split('.')[0];
           this.ActivityRegistry.set(activity.id,activity);
          });
        });
        this.LoadingInitial=false;
      } catch (error) {
        runInAction('Loading Activities error',()=>{
          this.LoadingInitial=false;
        });
         console.log(error);
      }
  }
  @action selectActivity=(id:string)=>{
      this.selectedActivity=this.ActivityRegistry.get(id);
      this.editMode=false;
  }
  @action createActivity= async(activity:IActivity)=>{

    try {
       await agent.Activities.create(activity);
       runInAction('Create Activity',()=>{
        this.ActivityRegistry.set(activity.id,activity)
        this.submitting=false;
        this.editMode=false;          
       });
    } catch (error) {
      runInAction('Creat activity error',()=>{
        this.submitting=false;
      });
      console.log(error);
    }  
  }
  @action  editActivity=async(activity:IActivity)=>{
    this.submitting=true;
    try {
      await agent.Activities.update(activity);
      runInAction('Edit Activity',()=>{
        this.ActivityRegistry.set(activity.id,activity);
        this.selectedActivity=activity;
        this.editMode=false;
        this.submitting=false;
      });

    } catch (error) {
      runInAction('Edit Activity error',()=>{
        this.submitting=false; 
      });
      console.log(error);

    }
  }
  @action deleteActivity=async(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
   this.submitting=true;
   this.target=event.currentTarget.name;
   try {
     await agent.Activities.delete(id);
      runInAction('Delete activity',()=>{
        this.ActivityRegistry.delete(id);
        this.submitting=false;
        this.target='';
      });
   } catch (error) {
     runInAction('Delete activity error',()=>{
      this.submitting=false;
      this.target='';
     });
     console.log(error);
   }
  }
  @action openCreateForm=()=>{
    this.editMode=true;
    this.selectedActivity=undefined;
  }
  @action openEditForm=(id:string)=>{
    this.selectedActivity=this.ActivityRegistry.get(id);
    this.editMode=true;
  }
  @action cancelSelectedActivity=()=>{
    this.selectedActivity=undefined;
  }
  @action cancelFormOpen=()=>{
    this.editMode=false;
  }
}

export default createContext(new ActivityStore())

