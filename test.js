child_list_name = ['F','I','L','N','P','T','U','V','W','X','Y','Z'];
child_list = [F,I,L,N,P,T,U,V,W,X,Y,Z];
child_clone = [F_clone,I_clone,L_clone,N_clone,P_clone,T_clone,U_clone,V_clone,W_clone,X_clone,Y_clone,Z_clone];
gltfScene.traverse(function(child) {

    for (var nbr_child = 11; nbr_child >= 0; nbr_child--){
        if (child_list_name[nbr_child] == child.name ){
            for ( var nbr_clone = 0; nbr_clone <= 3; nbr_clone ++){
                child_list[nbr_child].clone();
            }
            console.log("Found " + child); 
        }  
    }
});


