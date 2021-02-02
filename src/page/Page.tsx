import axios from 'axios';
import React, {useState} from 'react'
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Leaflet: React.FC<{location: [number, number]}> = ({location}) => {
    return (
        <>
        <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
        </>
    );
}

const queryFunction = async(ip: string) => {
    const {data} = await axios(`https://geo.ipify.org/api/v1?apiKey=at_vcFj91aYqjlJO4RqgoELADAXWivXZ&ipAddress=${ip}`)
    return data
}


const Page: React.FC = () => {

    const [ipstate, setipstate] = useState<string>('')
    const [IPStateSubmit, setIPStateSubmit] = useState<string>('8.8.8.8')
    const { data } = useQuery(['fetchIPData', IPStateSubmit], async() => await queryFunction(IPStateSubmit))

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIPStateSubmit(ipstate)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setipstate(event.target.value)
    }

    console.log(data)
   
        return (
            <div>
                IP Address Tracker
                {data && data.ip}
                Search for any IP address or domain
                <form onSubmit={handleSubmit}>
                    <input type="text" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" onChange={handleChange} />
                </form>
                IP Address
                Location
                Timezone
                UTC 
                ISP

                {data && <Leaflet location={[+data.location.lat, +data.location.lng]} />}

                <div className="attribution">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
                    Coded by <a href="#">Your Name Here</a>.
                </div>
            </div>
        );
}


export default Page