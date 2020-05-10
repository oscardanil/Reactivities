import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

 export const NavBar:React.FC = () => {
   return(
        <Menu fixed="top" inverted>
          <Container>
              <Menu.Item exact as={NavLink} to="/"  header>
               <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                Reactivities
              </Menu.Item>
            <Menu.Item as={NavLink} to="/activities" name='Activities' />
            <Menu.Item>
             <Button as={NavLink} to="/createactivities" positive content="Create Activity"/>
            </Menu.Item>
          </Container>      
        </Menu> 
    )
}

export default observer( NavBar)
