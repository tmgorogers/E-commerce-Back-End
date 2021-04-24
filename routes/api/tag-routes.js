const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data

  const tags = await Tag.findAll(
    {
    include: [{

      model: Product,
      through: {
        attributes: ['id','product_name', 'price', 'stock', 'category_id']
      },

    }]  
  }
  );

  if (products) {
    res.status(200).json(products);
  }

  res.status(400).json({message: "Something went wrong in the database!"});
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  const tagss = await tag.findOne({
    where:
    {
      id: req.params.id
    },
     
     include: [{
       model: Product,
       through: {
         attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
       }
     }]   
   }
 );
 
   if (allCategories) {
     res.status(200).json(allCategories);
   }
 
   res.status(500).json({message: "No category found with that id!"});
 
});

router.post('/', async(req, res) => {
  // create a new tag

  const tags = await Tag.create({
    tag_name:req.body.tag_name
       }
    
 );
 
   if (tags) {
     res.status(200).json(tags);
   }
 
   res.status(500).json(err);
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value


  const tags = await Tags.update(req.body,{
    where:
    {
      id: req.params.id
    },
     
  }   
 );
 
   if (tags) {
     res.status(200).json(tags);
   }
 
   res.status(500).json({message: "No category found with that id!"});
    
 

});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value

  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tags) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
