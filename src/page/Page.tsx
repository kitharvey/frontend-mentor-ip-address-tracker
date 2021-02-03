import axios from 'axios';
import React, {useState} from 'react'
import { useQuery } from 'react-query';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import GoogleMapReact from 'google-map-react';
import ReactMapGL, { Marker } from "react-map-gl";
import { ReactComponent as LocationMarker } from '../images/icon-location.svg';

interface MapComponentProps {
    latitude: number,
    longitude: number,
    zoom: number,
}


const MapComponent: React.FC<MapComponentProps> = ({latitude, longitude, zoom}) => {
    const MAPBOX_TOKEN = process.env.REACT_APP_MAP_KEY
    const [viewport, setViewport] = React.useState({
        latitude: latitude,
        longitude: longitude,
        zoom: zoom,
      });
    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={(viewport: MapComponentProps) => setViewport(viewport)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Marker latitude={latitude} longitude={longitude} offsetLeft={-23} offsetTop={-56}>
                    <LocationMarker />
                </Marker>
            </ReactMapGL>
      </div>
    );
}

const queryFunction = async(ip: string) => {
    const apiKey = process.env.REACT_APP_IPIFY_KEY
    const {data} = await axios(`https://geo.ipify.org/api/v1?apiKey=at_vc${apiKey}&ipAddress=${ip}`)
    return data
}


const Page: React.FC = () => {

    const [ipstate, setipstate] = useState<string>('')
    const [IPStateSubmit, setIPStateSubmit] = useState<string>('192.212.174.101')
    const { data } = useQuery(['fetchIPData', IPStateSubmit], async() => await queryFunction(IPStateSubmit))

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIPStateSubmit(ipstate)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setipstate(event.target.value)
    }


        return (
            <div className="wrapper" >
                <div className="top" >
                    <h1>IP Address Tracker</h1>
                    <form onSubmit={handleSubmit} className="ip-form">
                        <input type="text" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" onChange={handleChange} placeholder='Search for any IP address or domain' className='ip-input' />
                        <button type='submit' className='submit-button' />
                    </form>
                    <div className='ip-details-wrapper' >
                        <div className='ip-details' >
                        {data && (
                            <>
                            <div className='detail' >
                                <h4>IP Address</h4>
                                <p>{data.ip}</p>
                            </div>
                            <div className='detail' >
                                <h4>Location</h4>
                                <p>{`${data.location.city}, ${data.location.region}, ${data.location.country} ${data.location.postalCode}`}</p>
                            </div>
                            <div className='detail' >
                                <h4>Timezone</h4>
                                <p>UTC {data.location.timezone}</p>
                            </div>
                            <div className='detail' >
                                <h4>ISP</h4>
                                <p>{data.isp}</p>
                            </div>
                            </>
                        )}
                        </div>

                    </div>



                </div>
                {data && <MapComponent latitude={data.location.lat} longitude={data.location.lng} zoom={13} />}
               
                <div className="bottom">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
                    Coded by <a href="https://github.com/kitharvey/frontend-mentor-ip-address-tracker" target="_blank" rel="noreferrer">kitharvey</a>.
                </div>
            </div>
        );
}


export default Page