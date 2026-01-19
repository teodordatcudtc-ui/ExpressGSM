// Lista completă de județe din România
export const counties = [
  'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani',
  'Brașov', 'Brăila', 'București', 'Buzău', 'Caraș-Severin', 'Călărași',
  'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu',
  'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș',
  'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Sălaj', 'Satu Mare',
  'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vâlcea', 'Vaslui',
  'Vrancea'
]

// Lista de țări (cu România primul)
export const countries = [
  'România',
  'Albania', 'Austria', 'Belgia', 'Bulgaria', 'Cehia', 'Croația', 'Danemarca',
  'Estonia', 'Finlanda', 'Franța', 'Germania', 'Grecia', 'Irlanda', 'Italia',
  'Letonia', 'Lituania', 'Luxemburg', 'Malta', 'Olanda', 'Polonia', 'Portugalia',
  'Slovacia', 'Slovenia', 'Spania', 'Suedia', 'Ungaria', 'Regatul Unit',
  'Statele Unite', 'Canada', 'Australia', 'Altele'
]

// Localități principale pentru fiecare județ (exemplu - poți extinde)
export const citiesByCounty: Record<string, string[]> = {
  'Alba': ['Alba Iulia', 'Aiud', 'Blaj', 'Sebeș', 'Cugir', 'Ocna Mureș', 'Zlatna'],
  'Arad': ['Arad', 'Pecica', 'Chișineu-Criș', 'Ineu', 'Lipova', 'Nădlac', 'Pâncota'],
  'Argeș': ['Pitești', 'Câmpulung', 'Curtea de Argeș', 'Mioveni', 'Ștefănești', 'Topoloveni'],
  'Bacău': ['Bacău', 'Onești', 'Moinești', 'Comănești', 'Buhuși', 'Dărmănești'],
  'Bihor': ['Oradea', 'Salonta', 'Marghita', 'Beiuș', 'Aleșd', 'Valea lui Mihai'],
  'Bistrița-Năsăud': ['Bistrița', 'Beclean', 'Năsăud', 'Sângeorz-Băi', 'Sărățel'],
  'Botoșani': ['Botoșani', 'Dorohoi', 'Săveni', 'Flămânzi', 'Darabani', 'Bucecea'],
  'Brașov': ['Brașov', 'Făgăraș', 'Săcele', 'Codlea', 'Râșnov', 'Zărnești', 'Predeal'],
  'Brăila': ['Brăila', 'Ianca', 'Însurăței', 'Viziru', 'Făurei'],
  'București': ['București'],
  'Buzău': ['Buzău', 'Râmnicu Sărat', 'Pogoanele', 'Pătârlagele', 'Nehoiu'],
  'Caraș-Severin': ['Reșița', 'Caransebeș', 'Oravița', 'Moldova Nouă', 'Anina'],
  'Călărași': ['Călărași', 'Oltenița', 'Budești', 'Fundulea', 'Lehliu Gară'],
  'Cluj': ['Cluj-Napoca', 'Turda', 'Dej', 'Câmpia Turzii', 'Gherla', 'Huedin'],
  'Constanța': ['Constanța', 'Mangalia', 'Medgidia', 'Cernavodă', 'Năvodari', 'Ovidiu'],
  'Covasna': ['Sfântu Gheorghe', 'Târgu Secuiesc', 'Covasna', 'Baraolt', 'Întorsura Buzăului'],
  'Dâmbovița': ['Târgoviște', 'Moreni', 'Pucioasa', 'Găești', 'Fieni', 'Titu'],
  'Dolj': ['Craiova', 'Băilești', 'Calafat', 'Filiași', 'Segarcea', 'Bechet'],
  'Galați': ['Galați', 'Tecuci', 'Târgu Bujor', 'Berești', 'Măcin'],
  'Giurgiu': ['Giurgiu', 'Bolintin-Vale', 'Mihăilești', 'Vânătorii Mici'],
  'Gorj': ['Târgu Jiu', 'Motru', 'Rovinari', 'Bumbești-Jiu', 'Târgu Cărbunești'],
  'Harghita': ['Miercurea Ciuc', 'Odorheiu Secuiesc', 'Gheorgheni', 'Toplița', 'Cristuru Secuiesc'],
  'Hunedoara': ['Deva', 'Hunedoara', 'Petroșani', 'Orăștie', 'Lupeni', 'Vulcan'],
  'Ialomița': ['Slobozia', 'Fetești', 'Urziceni', 'Țăndărei', 'Amara'],
  'Iași': ['Iași', 'Pașcani', 'Hârlău', 'Târgu Frumos', 'Podu Iloaiei'],
  'Ilfov': ['Buftea', 'Otopeni', 'Pantelimon', 'Măgurele', 'Voluntari', 'Chitila'],
  'Maramureș': ['Baia Mare', 'Sighetu Marmației', 'Borșa', 'Vișeu de Sus', 'Târgu Lăpuș'],
  'Mehedinți': ['Drobeta-Turnu Severin', 'Orșova', 'Strehaia', 'Vânju Mare', 'Baia de Aramă'],
  'Mureș': ['Târgu Mureș', 'Reghin', 'Sighișoara', 'Luduș', 'Târnăveni', 'Sovata'],
  'Neamț': ['Piatra Neamț', 'Roman', 'Târgu Neamț', 'Bicaz', 'Roznov'],
  'Olt': ['Slatina', 'Caracal', 'Corabia', 'Drăgănești-Olt', 'Balș', 'Scornicești'],
  'Prahova': ['Ploiești', 'Câmpina', 'Băicoi', 'Breaza', 'Bușteni', 'Sinaia'],
  'Sălaj': ['Zalău', 'Jibou', 'Șimleu Silvaniei', 'Cehu Silvaniei'],
  'Satu Mare': ['Satu Mare', 'Carei', 'Negrești-Oaș', 'Tășnad', 'Ardud'],
  'Sibiu': ['Sibiu', 'Mediaș', 'Cisnădie', 'Avrig', 'Agnita', 'Dumbrăveni'],
  'Suceava': ['Suceava', 'Fălticeni', 'Rădăuți', 'Câmpulung Moldovenesc', 'Vatra Dornei'],
  'Teleorman': ['Alexandria', 'Roșiorii de Vede', 'Turnu Măgurele', 'Zimnicea'],
  'Timiș': ['Timișoara', 'Lugoj', 'Sânnicolau Mare', 'Jimbolia', 'Reșița'],
  'Tulcea': ['Tulcea', 'Babadag', 'Isaccea', 'Măcin', 'Sulina'],
  'Vâlcea': ['Râmnicu Vâlcea', 'Drăgășani', 'Călimănești', 'Băile Govora', 'Băile Olănești'],
  'Vaslui': ['Vaslui', 'Bârlad', 'Huși', 'Negrești', 'Murgeni'],
  'Vrancea': ['Focșani', 'Adjud', 'Mărășești', 'Odobești', 'Panciu']
}

// Funcție helper pentru a obține localitățile unui județ
export function getCitiesByCounty(county: string): string[] {
  return citiesByCounty[county] || []
}
