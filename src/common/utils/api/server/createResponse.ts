export const createResponse = ({ data, error }: { data: any; error: any }) => {
  if (error) {
    return Response.json(error, {
      status: 500,
    })
  }
  return Response.json(data)
}
