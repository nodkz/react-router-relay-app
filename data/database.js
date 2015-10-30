import fetch from 'isomorphic-fetch';
import moment from 'moment';
import DataLoader from 'dataloader';

const headers = {
    'Content-Type': 'application/json'
};

import path from 'path';
import event from './xamarin.json';

function call(path, options) {

    var fetchOptions = {...options, headers};
    return fetch(`http://localhost:56495/${path}`, fetchOptions)
        .then(response=> {

            console.log(`http://localhost:56495/${path} => ${response.status}`);

            let error = true
            if (response.status >= 200 && response.status < 300) {
                error = false;
            }
            return response.json().then(json=>{return {error, json};});

        }).then(({error, json})=> {
            if (error) {
                eventLoader.clear(path);
                throw new Error(json.messageDetail || json.message)
            }
            return json;
        });
}

const eventLoader = new DataLoader((eventIds) => Promise.all(eventIds.map(id => new Promise(resolve=>{

    var eventId = {eventId: id};

    resolve(Object.assign(new Event(), {id}, {
            details: event.details,
            speakers: event.speakers.map(x => Object.assign(new Speaker(), eventId, x)),
            sessions: event.sessions.map(x => Object.assign(new Session(), eventId, x)),
            sponsors: event.sponsors.map(x => Object.assign(new Sponsor(), eventId, x))
        })
    );

}))));

export function changeEventDetails(eventId, title, description, startDateUtc, endDateUtc) {

    startDateUtc = (startDateUtc ? moment.utc(startDateUtc) : moment.utc(0)).format();
    endDateUtc = (endDateUtc ? moment.utc(endDateUtc) : moment.utc(0)).format();

    return call(`events/${eventId}/details`, {
        method: 'POST',
        body: JSON.stringify({eventId, title, description, startDateUtc, endDateUtc})
    }).then((e)=> e.result);
}

export function createEvent(ownerId, title, description, startDateUtc, endDateUtc){
    startDateUtc = (startDateUtc ? moment.utc(startDateUtc) : moment.utc(0)).format();
    endDateUtc = (endDateUtc ? moment.utc(endDateUtc) : moment.utc(0)).format();

    return call(`events/`, {
        method: 'POST',
        body: JSON.stringify({ownerId, title, description, startDateUtc, endDateUtc})
    }).then((e)=> e.result);
}

export const loaders = {
    eventLoader
};

class Event extends Object {
}
class Speaker extends Object {
}
class Session extends Object {
}
class Sponsor extends Object {
}

export const models = {
    Event,
    Speaker,
    Session,
    Sponsor
};
