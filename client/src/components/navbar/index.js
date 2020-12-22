
import React,{ useState  } from 'react';
import { Link } from 'react-router-dom';
import {CloseIcon, MenuIcon ,GroupIcon , FiliereIcon, StagiaireIcon, AbsenceIcon, ModuleIcon, FormateurIcon, LogOutIcon} from '../../Icons'

import "./navbar.css";

const Navbar = ()=> {

 const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <header id="header" className="header">
        <div 
          className="Icon" 
          id='menuIcon'
          onClick= {()=> setMenuToggle(prev => { return !prev})}
        >
        {
            !menuToggle ? 
            <MenuIcon className="nav__menuIcon"/> :
            <CloseIcon  className="nav__closeIcon"/>
        }
        </div>
      </header>
  
      <div className="l-navbar" id="nav-bar">
           <nav className="nav">
              <div className ="nav__content">
                <Link to="/" className="nav__logo" id='nav__logo'>
                    <img className='nav__logoIcon' id='nav__logoIcon' src="images/ofppt_logo.svg" alt="logo"/>
                </Link>

                <div className="nav__list">
                    <Link to='/filieres' className="nav__link">
                        <FiliereIcon  className="nav__Icon"/>
                        <span className="nav__name">Filiere</span>
                    </Link>

                    <Link to='/groups' className="nav__link">
                        <GroupIcon className="nav__Icon"/>
                        <span className="nav__name">Groups</span>
                    </Link>
                    
                    <Link to='/stagiaires' className="nav__link">
                        <StagiaireIcon className="nav__Icon"/>
                        <span className="nav__name">Stagiaires</span>
                    </Link>

                    <Link to='/formateurs' className="nav__link">
                        <FormateurIcon className="nav__Icon"/>
                        <span className="nav__name">Formateurs</span>
                    </Link>

                    <Link to='/modules' className="nav__link">
                        <ModuleIcon className="nav__Icon"/>
                        <span className="nav__name">Modules</span>
                    </Link>

                    <Link to='/absences' className="nav__link">
                        <AbsenceIcon className="nav__Icon"/>
                        <span className="nav__name">Absences</span>
                    </Link>
                </div>
              </div>

              <Link to='/login' className="nav__link">
                  <LogOutIcon className="nav__Icon" />
                  <span className="nav__name">Log Out</span>
                </Link>
           </nav>
        </div>
     
    </>
  
  )
}

export default Navbar
