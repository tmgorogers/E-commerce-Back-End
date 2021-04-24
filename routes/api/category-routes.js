const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll(
    {
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

  res.status(500).json({message: "Something went wrong in the database!"});

});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  const allCategories = await Category.findOne({
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
  // create a new category
  const allCategories = await Category.create({
    category_name:req.body.category_name
       }
    
 );
 
   if (allCategories) {
     res.status(200).json(allCategories);
   }
 
   res.status(500).json(err);
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  const allCategories = await Category.update(req.body,{
    where:
    {
      id: req.params.id
    },
     
  }   
 );
 
   if (allCategories) {
     res.status(200).json(allCategories);
   }
 
   res.status(500).json({message: "No category found with that id!"});
    
 


});


router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value

  try {
    const allCategories = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!allCategories) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
