
import Location from "../models/Location.js"

export const saveLocation = async (tripId:string, lat:number, lng:number)=>{
  return Location.create({
    tripId,
    lat,
    lng,
    timestamp:new Date()
  })
}