import { NextResponse } from "next/server";
import axios from "axios";
import * as helpers from "../../../../data/validators";

export async function GET(req, { params }) {
    try {
        params.reference = helpers.isValidString(
            params.reference,
            "Photo Reference"
        );


        const res = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${encodeURIComponent(params.reference)}&skipHttpRedirect=true&key=${encodeURIComponent(
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        )}`);



        return NextResponse.json({ result: res.request.res.responseUrl });
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
