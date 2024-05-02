import { NextResponse } from "next/server";
import axios from "axios";
import * as helpers from "../../../../data/validators";

export async function GET(req, { params }) {
    try {
        params.id = helpers.isValidString(
            params.id,
            "Text Query"
        );

        const res = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
                params.id
            )}&key=${encodeURIComponent(
                process.env.GOOGLE_MAPS_API_KEY
            )}`
        );

        console.log("Google Places API Response:", res.data);

        return NextResponse.json({ result: res.data });
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
