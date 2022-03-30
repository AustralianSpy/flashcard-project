import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';

export default function DeckList( decks = []) {

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <h3 className="card-title col-9">Placeholder</h3>
                    <p className="card-text col-3">
                        <small className="text-muted"># of cards</small>
                    </p>
                </div>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aspernatur ad incidunt, ullam dignissimos voluptas alias. Voluptatum officiis voluptatem, illum quae voluptatibus sunt ut impedit distinctio beatae velit laboriosam quibusdam?</p>
                <div className="row">
                    <div className="col-9">
                        <Link className="btn btn-secondary">View</Link>
                        <Link href="#" className="btn btn-primary m-1">Study</Link>
                    </div>
                    <div className="col-3">
                        <Link className="btn btn-danger m-1 justify-self-end">Delete</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}