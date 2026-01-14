import { NextRequest, NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongo"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const mssv = searchParams.get("mssv")?.toUpperCase().trim()

    if (!mssv) {
        return NextResponse.json(
            { error: "Thiếu tham số mssv" },
            { status: 400 },
        )
    }

    try {
        const client = await getMongoClient()
        const db = client.db("advisor")
        const collection = db.collection("student")

        const doc = await collection.findOne(
            { mssv },
            { projection: { _id: 0 } },
        )

        if (!doc) {
            return NextResponse.json(
                { found: false, message: "Không tìm thấy thông tin Advisor của bạn." },
                { status: 404 },
            )
        }

        return NextResponse.json(
            {
                found: true,
                data: doc,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Mongo search error", error)
        return NextResponse.json(
            { error: "Lỗi máy chủ khi tra cứu Advisor." },
            { status: 500 },
        )
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null)
    const mssv = body?.mssv?.toUpperCase?.().trim?.()

    if (!mssv) {
        return NextResponse.json(
            { error: "Thiếu tham số mssv" },
            { status: 400 },
        )
    }

    try {
        const client = await getMongoClient()
        const db = client.db("advisor")
        const collection = db.collection("student")

        const doc = await collection.findOne(
            { mssv },
            { projection: { _id: 0 } },
        )

        if (!doc) {
            return NextResponse.json(
                { found: false, message: "Không tìm thấy thông tin Advisor của bạn." },
                { status: 404 },
            )
        }

        return NextResponse.json(
            {
                found: true,
                data: doc,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Mongo search error", error)
        return NextResponse.json(
            { error: "Lỗi máy chủ khi tra cứu Advisor." },
            { status: 500 },
        )
    }
}


