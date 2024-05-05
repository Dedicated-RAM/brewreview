import { NextResponse } from "next/server";
import axios from "axios";
import * as helpers from "../../../../data/validators";

export async function GET(req, { params }) {
	try {
		params.textQuery = helpers.isValidString(
			params.textQuery,
			"Text Query"
		);

		const res = await axios.get(
			`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
				params.textQuery
			)}&inputtype=textquery&key=${encodeURIComponent(
				process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
			)}`
		);

		return NextResponse.json({ result: res.data });
	} catch (e) {
		console.error("Error:", e.response ? e.response.data : e.message);
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
