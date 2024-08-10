//Var is function Scoped and it can be Redeclared anywhere.
   var a=10;
  {
    var a=20;
    console.log(a);
   }
   console.log(a); 

//Let is Block-scoped and it can be Redeclared anywhere
     let b=10;
    {
     let b=20;
     console.log(b);
    }
console.log(b);
//Const Can't be Redeclared again. If you declared again it will throw the error.
       const c=10;
       {
         c=20;
         console.log(c);
       }
       console.log(c);

      