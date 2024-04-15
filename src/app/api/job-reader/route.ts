import * as cheerio from 'cheerio'
import { convert as convertHtml } from 'html-to-text'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let schema
  const { jobUrl } = await req.json()
  if (!jobUrl) {
    return {
      errror: {
        message: 'missing job url',
      },
    }
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
        jobDescription: convertHtml(parsed?.description),
        employmentType: parsed?.employmentType,
        jobLocationType: parsed?.jobLocationType,
        jobLocation: parsed?.jobLocation?.address?.addressCountry,
        jobTitle: parsed?.title,
        salaryMin: parsed?.baseSalary?.value?.minValue,
        salaryMax: parsed?.baseSalary?.value?.maxValue,
      }
    }

    return NextResponse.json({
      schema,
    })
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'server error',
      },
    }
  }
}
