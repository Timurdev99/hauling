const usersData = [];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const body = req.body;
  usersData.push(body);
  res.status(200).json(body);
}
