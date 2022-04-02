import React from 'react';
import { Link } from 'react-router-dom';

/*
    This bar is used by these Deck CRUD components for navigation:
        StudyDeck, CreateDeck, Deck, EditDeck, AddCard, EditCard.

    Will need to grab ids from params to access titles for crumbs.
*/

export default function BreadcrumbBar({ breadcrumbs }) {
    // set state of breadcrumbs in Deck, to be updated by each component.
    // each component must add an OBJECT to an array of breadcrumbs as such:
    // [ { name: pageName, url: urlPath }, ... ]
    // map breadcrumb array AFTER initial home breadcrumb
    // give last item in array the class of ACTIVE
    

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li key='0' className="breadcrumb-item">
                    <a href='/'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16"
                        fill="currentColor"
                        className="bi bi-house-door-fill mr-2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                    </svg>
                    Home
                    </a>
                </li>
                {
                    (breadcrumbs) ?
                    breadcrumbs.map((crumb) => (
                        (breadcrumbs.indexOf(crumb) === breadcrumbs.length - 1) ?
                        <li key={breadcrumbs.indexOf(crumb) + 1} className="breadcrumb-item active">
                            <Link to={`${crumb.url}`} className='text-secondary'>
                                {crumb.name}
                            </Link>
                        </li> :
                        <li key={breadcrumbs.indexOf(crumb) + 1} className="breadcrumb-item">
                            <Link to={`${crumb.url}`}>
                                {crumb.name}
                            </Link>
                        </li>
                    )) : null
                }
            </ol>
        </nav>
    );
}