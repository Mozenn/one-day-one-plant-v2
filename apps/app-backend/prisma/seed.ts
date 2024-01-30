import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const plantsData = [
    {
      name: 'subalpine fir',
      scientificName: 'abies lasiocarpa',
      family: 'pinaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Abies_lasiocarpa_26008.JPG/450px-Abies_lasiocarpa_26008.JPG',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Abies_lasiocarpa',
        },
      ],
    },
    {
      name: 'sour cherry',
      scientificName: 'prunus cerasus',
      family: 'rosaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg/1280px-Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Prunus_cerasus',
        },
        {
          source: 'INP',
          url: 'https://inpn.mnhn.fr/espece/cd_nom/116054',
        },
      ],
    },
    {
      name: 'chinese witch hazel',
      scientificName: 'hamamelis mollis',
      family: 'hamamelidaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Hamamelis_mollis0.jpg/220px-Hamamelis_mollis0.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Hamamelis_mollis',
        },
      ],
    },
    {
      name: 'asian pear',
      scientificName: 'pyrus pyrifolia',
      family: 'rosaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Nashi_pear.jpg/800px-Nashi_pear.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Pyrus_pyrifolia',
        },
      ],
    },
    {
      name: 'silver maple',
      scientificName: 'acer saccharinum',
      family: 'sapindaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Silber-Ahorn_%28Acer_saccharinum%29.jpg/220px-Silber-Ahorn_%28Acer_saccharinum%29.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Acer_saccharinum',
        },
      ],
    },
    {
      name: 'cucumber tree',
      scientificName: 'magnolia acuminata',
      family: 'magnoliaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Magnolia_acuminata.jpg/220px-Magnolia_acuminata.jpg',
      urls: [
        {
          label: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Magnolia_acuminata',
        },
      ],
    },
    {
      name: 'korean rhododendron',
      scientificName: 'rhododendron mucronulatum',
      family: 'ericaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Korea-Jindallae-Rhododendron_mucronulatum-01.jpg/220px-Korea-Jindallae-Rhododendron_mucronulatum-01.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Rhododendron_mucronulatum',
        },
      ],
    },
    {
      name: 'water lettuce',
      scientificName: 'pistia',
      family: 'araceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pistia_stratiotes0.jpg/220px-Pistia_stratiotes0.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Pistia',
        },
      ],
    },
    {
      name: 'sessile oak',
      scientificName: 'quercus petraea',
      family: 'fagaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Quercus_petraea_06.jpg/220px-Quercus_petraea_06.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Quercus_petraea',
        },
      ],
    },
    {
      name: 'amazon sword',
      scientificName: 'echinodorus bleheri',
      family: 'alismataceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/8/81/Echinodorus_grisebachii_-_flower_view_01.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Echinodorus_bleheri',
        },
      ],
    },
    {
      name: 'anacharis',
      scientificName: 'elodea canadensis',
      family: 'hydrocharitaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ElodeaCanadensis.jpg/220px-ElodeaCanadensis.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Elodea_canadensis',
        },
      ],
    },
    {
      name: 'red root floaters',
      scientificName: 'phylanthus fluitans',
      family: 'phylanthaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Phyllanthus_fluitans_2010-06-20_01.jpg/220px-Phyllanthus_fluitans_2010-06-20_01.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Phylanthus_fluitans',
        },
      ],
    },
    {
      name: 'lavender',
      scientificName: 'lavandula',
      family: 'lamiaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/220px-Single_lavender_flower02.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Lavandula',
        },
      ],
    },
    {
      name: 'bamboo',
      scientificName: 'bambusoideae',
      family: 'poaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Bamboo_forest.jpg/220px-Bamboo_forest.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Bamboo',
        },
      ],
    },
    {
      name: 'psilotaceae fern',
      scientificName: 'psilotaceae',
      family: 'psilotaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/0d/Psilotum.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Psilotaceae',
        },
      ],
    },
    {
      name: 'orchid',
      scientificName: 'orchidaceae',
      family: 'orchidaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/White_orchid_in_Clara_bog._03.jpg/220px-White_orchid_in_Clara_bog._03.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Orchidaceae',
        },
      ],
    },
    {
      name: 'daffodil',
      scientificName: 'narcissus',
      family: 'amaryllidaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Narcissus_poeticus_subsp._radiiflorus.1658.jpg/220px-Narcissus_poeticus_subsp._radiiflorus.1658.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Narcissus_(plant)',
        },
      ],
    },
    {
      name: 'cactus',
      scientificName: 'cactaceae',
      family: 'cactaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Singapore_Botanic_Gardens_Cactus_Garden_2.jpg/225px-Singapore_Botanic_Gardens_Cactus_Garden_2.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Cactus',
        },
      ],
    },
    {
      name: 'tulip',
      scientificName: 'tulipa',
      family: 'liliaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%9D.JPG/220px-%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%9D.JPG',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Tulip',
        },
      ],
    },
    {
      name: 'fuchsia',
      scientificName: 'fuchsia',
      family: 'onagraceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Brincos_De_Princesa.jpg/220px-Brincos_De_Princesa.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Fuchsia',
        },
      ],
    },
    {
      name: 'oshima cherry',
      scientificName: 'prunus speciosa',
      family: 'rosaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/%C5%8Cshima-zakura2.jpg/220px-%C5%8Cshima-zakura2.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Prunus_speciosa',
        },
      ],
    },
    {
      name: 'aloe vera',
      scientificName: 'aloe vera',
      family: 'xanthorrhoeaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/260px-Aloe_vera_flower_inset.png',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Aloe_vera',
        },
      ],
    },
  ];

  const upsertPlant = async (plantData) => {
    const plant = await prisma.plant.upsert({
      where: { name: plantData.name },
      update: {},
      create: plantData,
    });
    console.log(plant);
  };

  for (const plantData of plantsData) {
    await upsertPlant(plantData);
  }

  const user1 = await prisma.user.upsert({
    where: { email: 'gauthier.cassany@gmail.com' },
    update: {},
    create: {
      username: 'user1',
      email: 'gauthier.cassany@gmail.com',
      score: 450,
      profilePlantUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Abies_lasiocarpa_26008.JPG/450px-Abies_lasiocarpa_26008.JPG',
      createdAt: new Date(),
      password: await hash('Password1*', 10),
      verified: true,
      lastDrawDate: new Date('2021-05-04 19:10:25'),
      lastDrawPlantId: 1,
      plants: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        // create: [
        //   {
        //     name: 'test',
        //     scientificName: 'test',
        //     family: 'test',
        //     imageUrl: 'test',
        //     urls: '{}',
        //   },
        // ],
      },
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'gauthierclapiers@hotmail.fr' },
    update: {},
    create: {
      username: 'user2',
      email: 'gauthierclapiers@hotmail.fr',
      score: 500,
      profilePlantUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Abies_lasiocarpa_26008.JPG/450px-Abies_lasiocarpa_26008.JPG',
      createdAt: new Date('2023-12-07 19:10:25'),
      password: await hash('Password1*', 10),
      verified: false,
      lastDrawDate: new Date('2021-05-04 19:10:25'),
      lastDrawPlantId: 2,
      plants: {
        connect: [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
      },
    },
  });
  console.log({ user1, user2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
