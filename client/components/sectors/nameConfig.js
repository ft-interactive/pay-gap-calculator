
//rename sectors to make them more readable

const nameConfigFull = {
  "Managers, directors and senior officials": "Management",
  "Corporate managers and directors": "Corporate management",
  "Other managers and proprietors": "Proprietors, other types of managers",
  "Professional occupations": "Professional role, requiring a degree",
  "Health professionals": "Health professional, eg. doctor, nurse",
  "Science, research, engineering and technology professionals": "Science, engineering or technology professional",
  "Teaching and educational professionals": "Teacher or other education professional",
  "Business, media and public service professionals": "Business or media professional, or civil servant eg. lawyer, financial analyst",
  "Associate professional and technical occupations": "Assistant professional role, requiring training",
  "Science, engineering and technology associate professionals": "Science, engineering and technology associate professionals, eg. lab technician, building inspector",
  "Health and social care associate professionals": "Health & social work associate professionals, eg. paramedic, youth worker",
  "Protective service occupations": "Police, firefighters, other roles in security",
  "Culture, media and sports occupations": "Culture, media and sports, eg. designers, musicians, fitness instructors",
  "Business and public service associate professionals": "Assistant roles in business and public services, eg. underwriters, paralegals",
  "Administrative and secretarial occupations": "Administrative or secretarial",
  "Administrative occupations": "Administrative roles, eg. book-keeping, data-entry",
  "Secretarial and related occupations": "Secretarial roles",
  "Skilled trades occupations": "Skilled trade",
  "Caring, leisure and other service occupations": "Caring or personal service",
  "Caring personal service occupations": "Caring roles eg. childcare, vetinary nurse",
  "Leisure, travel and related personal service occupations": "Leisure, travel and hospitality roles, eg. hairdressers, cleaners, train conductors",
  "Sales and customer service occupations": "Sales or customer service",
  "Sales occupations": "Sales",
  "Customer service occupations": "Customer service",
  "Process, plant and machine operatives": "Factory workers or machine operatives",
  "Transport and mobile machine drivers and operatives": "Drivers, transport roles",
  "Elementary occupations": "Low-skilled jobs",
  "Elementary trades and related occupations": "Elementary trades, eg. industrial cleaning, farm working",
  "Elementary administration and service occupations": "Elementary administration and service roles, eg. shelf-filling, waiters"
}

// used for feedback boxes, sector names given without examples
const nameConfigShort = {
  "Managers, directors and senior officials": "Management",
  "Corporate managers and directors": "Corporate management",
  "Other managers and proprietors": "Proprietors, other types of managers",
  "Professional occupations": "Professional role requiring a degree",
  "Health professionals": "Health professional",
  "Science, research, engineering and technology professionals": "Science, engineering or technology professional",
  "Teaching and educational professionals": "Teacher or other education professional",
  "Business, media and public service professionals": "Business or media professional, or civil servant",
  "Associate professional and technical occupations": "Assistant professional",
  "Science, engineering and technology associate professionals": "Science, engineering and technology associate professional",
  "Health and social care associate professionals": "Health & social work associate professional",
  "Protective service occupations": "Police, firefighters, other roles in security",
  "Culture, media and sports occupations": "Culture, media and sports",
  "Business and public service associate professionals": "Assistant professional in business or public service",
  "Administrative and secretarial occupations": "Administrative or secretarial",
  "Administrative occupations": "Administrative",
  "Secretarial and related occupations": "Secretarial",
  "Skilled trades occupations": "Skilled trade",
  "Caring, leisure and other service occupations": "Caring or personal service",
  "Caring personal service occupations": "Caring roles eg. childcare, vetinary nurse",
  "Leisure, travel and related personal service occupations": "Leisure, travel and hospitality roles",
  "Sales and customer service occupations": "Sales or customer service",
  "Sales occupations": "Sales",
  "Customer service occupations": "Customer service",
  "Process, plant and machine operatives": "Factory workers or machine operatives",
  "Transport and mobile machine drivers and operatives": "Drivers, transport roles",
  "Elementary occupations": "Low-skilled jobs",
  "Elementary trades and related occupations": "Elementary trades",
  "Elementary administration and service occupations": "Elementary administration and service roles"
}

export {nameConfigFull, nameConfigShort};