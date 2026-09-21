import json, re

with open('lib/candidates-registry.ts', 'r') as f:
    text = f.read()

county_spec_profiles = {
    "Alexandra del Moral Mealer": {
        "bio": "Alexandra del Moral Mealer (41 years old), Harvard JD/MBA, combat engineer Army captain veteran in Afghanistan, and corporate finance specialist running for Harris County leadership.",
        "platform": "Auditing county government spending, eliminating backlogs in criminal court dockets, prioritizing flood mitigation infrastructure along bayous, and funding law enforcement retention."
    },
    "Robert Luna": {
        "bio": "Robert Luna (59 years old), Sheriff of Los Angeles County leading the nation's largest sheriff's department. Former 36-year Long Beach Police Chief focusing on department reform, transparency, and eliminating deputy gangs.",
        "platform": "Eradicating illicit deputy cliques inside LASD stations, deploying body-worn cameras to all deputies, expanding mental health clinician co-responder teams, and modernizing Men's Central Jail."
    },
    "Alex Villanueva": {
        "bio": "Alex Villanueva (63 years old), former Los Angeles County Sheriff (2018-2022) and 34-year LASD veteran known for aggressive enforcement of public camping bans and combating street crime.",
        "platform": "Clearing encampments in unincorporated county areas, surging patrol deputies to public transit lines, reducing business retail theft, and cutting administrative departmental bureaucracy."
    },
    "Fritz Kaegi": {
        "bio": "Fritz Kaegi (54 years old), Cook County Assessor and chartered financial analyst (CFA). Reforming Cook County's property tax assessment system to ensure ethical, data-driven, and equitable commercial valuations.",
        "platform": "Eliminating regressive assessment disparities on working homeowners, modernizing property tax modeling algorithms, and ending private insider appeals tax advantages for commercial towers."
    },
    "Kari Steele": {
        "bio": "Kari Steele (50 years old), President of the Metropolitan Water Reclamation District of Greater Chicago and licensed chemist. Experienced environmental administrator overseeing multi-billion-dollar public infrastructure.",
        "platform": "Streamlining Cook County property assessment customer service, expanding taxpayer relief exemptions for seniors and veterans, and ensuring transparent open-source assessment models."
    },
    "John Creuzot": {
        "bio": "John Creuzot (68 years old), Dallas County District Attorney and former felony district court judge of 21 years. Nationally recognized pioneer of drug courts and restorative justice programs.",
        "platform": "Prioritizing resources on violent felony prosecutions, expanding the DA Conviction Integrity Unit, diversion courts for nonviolent mental health offenders, and eliminating case backlogs."
    },
    "Faith Johnson": {
        "bio": "Faith Johnson (74 years old), former Dallas County District Attorney and former district court judge. Seasoned prosecutor focused on victims' rights and community-based law enforcement partnerships.",
        "platform": "Aggressive prosecution of repeat violent offenders, strengthening child abuse and domestic violence prosecution units, and rebuilding strong coordination with local police chiefs."
    },
    "James Reyes": {
        "bio": "James Reyes (48 years old), Miami-Dade Chief of Public Safety and 25-year law enforcement executive. Overseeing the historic transition to an independent Miami-Dade County Sheriff's Office.",
        "platform": "Standing up the newly independent Miami-Dade Sheriff's Office with community-first neighborhood patrols, investing in anti-gang violence task forces, and expanding mental health response units."
    },
    "Rosie Cordero-Stutz": {
        "bio": "Rosie Cordero-Stutz (56 years old), 28-year veteran of the Miami-Dade Police Department serving as Assistant Director of Investigative Services and FBI National Academy graduate.",
        "platform": "Surging patrol presence across unincorporated Miami-Dade, modernizing departmental forensic technology, cracking down on organized retail theft, and expanding youth athletic leagues."
    },
    "Kevin McMahill": {
        "bio": "Kevin McMahill (57 years old), Sheriff of the Las Vegas Metropolitan Police Department and 34-year law enforcement veteran. Leading safety operations across Clark County and the Las Vegas Strip.",
        "platform": "Deploying cutting-edge real-time crime center technologies along the resort corridor, proactive gang interdiction, expanding officer wellness programs, and reducing violent crime."
    },
    "Sherlett Hendy Newbill": {
        "bio": "Sherlett Hendy Newbill (52 years old), Los Angeles Unified School District Board Member (District 1), veteran Dorsey High School educator, basketball coach, and athletic director.",
        "platform": "Expanding career and technical education pathways in South LA schools, upgrading campus athletic and STEM facilities, reducing class sizes, and strengthening mental health counselors."
    },
    "Kahllid Al-Alim": {
        "bio": "Kahllid Al-Alim (58 years old), community organizer, parent activist, and former member of the LAUSD Parent Advisory Committee focusing on educational equity.",
        "platform": "Universal after-school enrichment programs, restorative justice practices, expanding parent engagement councils, and increasing funding for neighborhood public neighborhood schools."
    },
    "Marcus Webb": {
        "bio": "Marcus Webb (46 years old), Fulton County Soil & Water Conservation District Supervisor and agricultural extension specialist.",
        "platform": "Urban soil remediation, expanding community agricultural gardens in Atlanta, watershed runoff mitigation, and environmental conservation education in local public schools."
    },
    "Priya Chandrasekaran": {
        "bio": "Priya Chandrasekaran (37 years old), hydrology researcher and civil environmental engineer specializing in stormwater infiltration in Georgia watersheds.",
        "platform": "Protecting the Chattahoochee River basin from industrial runoff, expanding permeable pavement incentives, and implementing green stormwater retention swales."
    },
    "Robert Tanner": {
        "bio": "Robert Tanner (54 years old), Master Gardener and environmental educator focusing on native pollinator habitats and agricultural conservation.",
        "platform": "Expanding native tree canopies in underserved Atlanta neighborhoods, soil erosion control along urban stream banks, and regional conservation workshops."
    },
    "Eric William Carter": {
        "bio": "Eric William Carter (48 years old), Harris County Justice of the Peace (Precinct 1) and experienced attorney managing small claims, evictions, and magistrate hearings.",
        "platform": "Implementing digital court access for pro-se litigants, connecting tenants and landlords with eviction diversion mediation programs, and modernizing court proceedings."
    },
    "David Lopez": {
        "bio": "David Lopez (52 years old), mediator, municipal magistrate, and civic arbitrator focusing on fair dispute resolution in Harris County.",
        "platform": "Expanding evening and weekend court sessions for working citizens, fair and efficient disposition of small claims, and bilingual court service navigators."
    },
    "Tonya Nixon": {
        "bio": "Tonya Nixon (50 years old), Travis County Constable (Precinct 1) and veteran law enforcement administrator with 28 years of service in Central Texas.",
        "platform": "Community-oriented civil process execution, youth mentorship programs, de-escalation training for deputy constables, and neighborhood civic watch partnerships."
    },
    "Larry L. Sisk": {
        "bio": "Larry L. Sisk (58 years old), former deputy sheriff and veteran Texas law enforcement officer with three decades of tactical and patrol experience.",
        "platform": "Professionalizing constable civil service warrants, increasing courthouse perimeter security, and maximizing operational efficiency on taxpayer dollars."
    },
    "Maria Kuriakos Ciesil": {
        "bio": "Maria Kuriakos Ciesil (59 years old), Cook County Circuit Court Judge and former assistant state's attorney with 30 years of legal and judicial experience.",
        "platform": "Reducing civil and municipal trial delays, expanding restorative justice courts, ensuring equal access to justice, and judicial impartiality."
    },
    "James Murphy-Aguilu": {
        "bio": "James Murphy-Aguilu (47 years old), Administrative Law Judge and former Cook County assistant state's attorney specializing in municipal ethics.",
        "platform": "Modernizing courtroom electronic document filing, expanding legal aid resources for unrepresented parties, and maintaining rigorous judicial ethics."
    },
    "Mark Thoman": {
        "bio": "Mark Thoman (62 years old), Downers Grove Township Supervisor, civic volunteer, and former community high school district board member.",
        "platform": "Expanding senior transportation van services, funding township youth behavioral health counseling, and streamlining township road maintenance districts."
    },
    "Greg Hosé": {
        "bio": "Greg Hosé (44 years old), Downers Grove Village Commissioner, attorney, and former Village Council member focusing on local municipal services.",
        "platform": "Fiscal transparency in township taxing districts, expanding food pantry assistance programs, and modernizing stormwater infrastructure."
    },
    "Dan Panico": {
        "bio": "Dan Panico (47 years old), Brookhaven Town Supervisor, land use attorney, and former town councilman in Suffolk County, Long Island.",
        "platform": "Demolishing zombie and blighted properties, preserving Long Island Pine Barrens open spaces, coastal salt marsh restoration, and holding municipal taxes flat."
    },
    "Lillian Clayman": {
        "bio": "Lillian Clayman (68 years old), former mayor, college lecturer in labor history, and longtime community civic leader in Suffolk County.",
        "platform": "Preserving affordable housing for young families on Long Island, clean groundwater protections, upgrading municipal recycling facilities, and ethics oversight."
    }
}

# Update all matching candidates
def update_cands(text):
    for name, prof in county_spec_profiles.items():
        # replace biography
        pattern_bio = r'(\"name\":\s*\"' + re.escape(name) + r'\"[\s\S]*?\"biography\":\s*\")[^\"]+(\")'
        text = re.sub(pattern_bio, r'\g<1>' + prof['bio'] + r'\g<2>', text)
        # replace platform
        pattern_plat = r'(\"name\":\s*\"' + re.escape(name) + r'\"[\s\S]*?\"platformStance\":\s*\")[^\"]+(\")'
        text = re.sub(pattern_plat, r'\g<1>' + prof['platform'] + r'\g<2>', text)
    return text

text_updated = update_cands(text)

with open('lib/candidates-registry.ts', 'w') as f:
    f.write(text_updated)

print("✅ Updated remaining candidate profiles in lib/candidates-registry.ts")
