import * as cheerio from 'cheerio'
import { htmlToText } from '@/common/utils/string/htmlToText'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let schema
  const { jobUrl } = await req.json()
  if (!jobUrl) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: 'missing job url',
        },
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
  try {
    const res = await fetch(jobUrl)
    const body = await res.text()

    const $ = cheerio.load(body)
    const script = $('script[type="application/ld+json"]').html()

    if (script) {
      const parsed = JSON.parse(script)
      schema = {
        companyLogo: parsed?.hiringOrganization?.logo,
        companyName: parsed?.hiringOrganization?.name,
        companyUrl: parsed?.hiringOrganization?.sameAs,
        datePosted: parsed?.datePosted,
        jobDescription: htmlToText(parsed?.description),
        employmentType: parsed?.employmentType,
        jobLocationType: parsed?.jobLocationType,
        jobLocation: parsed?.jobLocation?.address?.addressCountry,
        jobTitle: parsed?.title,
        salaryMin: parsed?.baseSalary?.value?.minValue,
        salaryMax: parsed?.baseSalary?.value?.maxValue,
      }
    }

    console.log(schema?.jobDescription)

    return NextResponse.json({
      schema,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({
        error: {
          message: 'error fetching job',
        },
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
