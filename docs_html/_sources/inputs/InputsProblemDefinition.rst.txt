Problem Definition
==================

In this section it is described how the input file can be configured in order to
specify the settings of the problem at hand. The input file must be
passed as first argument to the MFIX-Exa executable.


System of Units
---------------

MFIX-Exa adopts the International System of Units (SI). Simulations have to be
set up accordingly. In the following table we provide a list of some of the
physical quantities we can specify in the input file and their correspondent
units.

+----------------------------+-----------------------------------------+
| Physical quantity          | MFIX-Exa SI unit                        |
+============================+=========================================+
| amount of substance        | mole [:math:`mol`]                      |
+----------------------------+-----------------------------------------+
| length                     | meter [:math:`m`]                       |
+----------------------------+-----------------------------------------+
| mass                       | kilogram [:math:`kg`]                   |
+----------------------------+-----------------------------------------+
| time                       | second [:math:`s`]                      |
+----------------------------+-----------------------------------------+
| force                      | Newton [:math:`N`]                      |
+----------------------------+-----------------------------------------+
| temperature                | Kelvin [:math:`K`]                      |
+----------------------------+-----------------------------------------+
| pressure                   | Pascal [:math:`Pa`]                     |
+----------------------------+-----------------------------------------+
| energy                     | Joule [:math:`J`]                       |
+----------------------------+-----------------------------------------+
| power                      | Watt [:math:`W`]                        |
+----------------------------+-----------------------------------------+
| density                    | [:math:`kg \cdot m^{-3}`]               |
+----------------------------+-----------------------------------------+
| velocity                   | [:math:`m \cdot s^{-1}`]                |
+----------------------------+-----------------------------------------+
| dynamic viscosity          | [:math:`Pa \cdot s`]                    |
+----------------------------+-----------------------------------------+
| diffusivity                | [:math:`m^2 \cdot s^{-1}`]              |
+----------------------------+-----------------------------------------+
| specific heat capacity     | [:math:`J \cdot kg^{-1} \cdot K^{-1}`]  |
+----------------------------+-----------------------------------------+
| thermal conductivity       | [:math:`W \cdot m^{-1} \cdot K^{-1}`]   |
+----------------------------+-----------------------------------------+
| spring coefficient         | [:math:`N \cdot m^{-1}`]                |
+----------------------------+-----------------------------------------+
| molecular weight           | [:math:`kg \cdot mol^{-1}`]             |
+----------------------------+-----------------------------------------+
| heat of formation          | [:math:`J \cdot kg^{-1}`]               |
+----------------------------+-----------------------------------------+
| chemical reaction rate     | [:math:`mol \cdot m^{-3} \cdot s^{-1}`] |
+----------------------------+-----------------------------------------+


Mesh settings
-------------

There are some settings we can specify for the mesh and the automatic mesh
refinement algorithm. These settings must be preceded by "amr." in the input
file.

+-------------------+---------------------------------------------------------------------+-------------+-----------+
|                   | Description                                                         |   Type      | Default   |
+===================+=====================================================================+=============+===========+
| n_cell            | Number of cells at level 0 in each coordinate direction             |    Ints     | None      |
+-------------------+---------------------------------------------------------------------+-------------+-----------+
| max_level         | Maximum level of refinement allowed (0 when single-level)           |    Int      | None      |
+-------------------+---------------------------------------------------------------------+-------------+-----------+


Geometry settings
-----------------


The following inputs must be preceded by "geometry."

+-----------------+-----------------------------------------------------------------------+-------------+-----------+
|                 | Description                                                           |   Type      | Default   |
+=================+=======================================================================+=============+===========+
| coord_sys       | 0 for Cartesian                                                       |   Int       |   0       |
+-----------------+-----------------------------------------------------------------------+-------------+-----------+
| is_periodic     | 1 for true, 0 for false (one value for each coordinate direction)     |   Ints      | 0 0 0     |
+-----------------+-----------------------------------------------------------------------+-------------+-----------+
| prob_lo         | Low corner of physical domain (physical not index space)              |   Reals     | None      |
+-----------------+-----------------------------------------------------------------------+-------------+-----------+
| prob_hi         | High corner of physical domain (physical not index space)             |   Reals     | None      |
+-----------------+-----------------------------------------------------------------------+-------------+-----------+


MFIX-Exa settings
-----------------


The following inputs must be preceded by "mfix."

+------------------------+-------------------------------------------------------------------+----------+-----------+
|                        | Description                                                       |   Type   | Default   |
+========================+===================================================================+==========+===========+
| geometry               | Which type of EB geometry are we using?                           |   String |           |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| levelset__refinement   | Refinement factor of levelset resolution relative to level 0      |   Int    | 1         |
|                        | resolution                                                        |          |           |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| po_no_par_out          | Let particles exit (default) or bounce-back at pressure outflows  |   Int    | 0         |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| gravity                | Gravity vector (e.g., mfix.gravity = -9.81  0.0  0.0) [required]  |   Reals  | 0 0 0     |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| advect_density         | Switch for turning ON (1) or OFF (0) fluid density evolution      |   Int    | 0         |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| advect_enthalpy        | Switch for turning ON (1) or OFF (0) fluid temperature evolution  |   Int    | 0         |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| advect_fluid_species   | Switch for turning ON (1) or OFF (0) fluid species mass fraction  |   Int    | 0         |
|                        | evolution                                                         |          |           |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| solve_reactions        | Switch for turning ON (1) or OFF (0) inter/intra-phase chemical   |   Int    | 0         |
|                        | reactions                                                         |          |           |
+------------------------+-------------------------------------------------------------------+----------+-----------+
| ideal_gas_constraint   | Turn this ON to impose an open/closed system ideal-gas constraint |   String | None      |
|                        | Default is 'None' (no ideal-gas constraint). To activate it, pass |          |           |
|                        | 'OpenSystem' or 'ClosedSystem' (case-insensitive)                 |          |           |
+------------------------+-------------------------------------------------------------------+----------+-----------+


Species model settings
----------------------

Enabling the species mass fraction solver and specifying species model options.

+----------------------+-------------------------------------------------------------------------+----------+-----------+
|                      | Description                                                             |   Type   | Default   |
+======================+=========================================================================+==========+===========+
| species.solve        | Specified name of the species or None to disable the species solver.    | String   |  None     |
|                      | The name assigned to the species solver is used to specify species      |          |           |
|                      | inputs.                                                                 |          |           |
+----------------------+-------------------------------------------------------------------------+----------+-----------+


The following inputs must be preceded by the "species." prefix

+-------------------------------------------+-------------------------------------------------------+----------+-----------+
|                                           | Description                                           |   Type   | Default   |
+===========================================+=======================================================+==========+===========+
| [specie0].molecular_weight                | Value of species molecular weight. [required if       |  Real    |  0        |
|                                           | fluid.molecular_weight='mixture'].                    |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| diffusivity                               | Specify which diffusivity model to use for species    | String   |  None     |
|                                           | [required].                                           |          |           |
|                                           | Available options include:                            |          |           |
|                                           |                                                       |          |           |
|                                           | * 'constant' for constant diffusivity model           |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| [specie0].diffusivity.constant            | Value of constant species diffusivity. [required if   |  Real    |  None     |
|                                           | diffusivity_model='constant'].                        |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| specific_heat                             | Specify which specific heat model to use for species  | String   |  None     |
|                                           | [required if fluid.molecular_weight='mixture'].       |          |           |
|                                           | Available options include:                            |          |           |
|                                           |                                                       |          |           |
|                                           | * 'constant' for constant specific heat model         |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| [specie0].specific_heat.constant          | Value of constant species diffusivity. [required if   |  Real    |  None     |
|                                           | diffusivity model='constant'].                        |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| enthalpy_of_formation                     | Specify which enthalpy of formation model to use for  | String   |  None     |
|                                           | species.                                              |          |           |
|                                           | Available options include:                            |          |           |
|                                           |                                                       |          |           |
|                                           | * 'constant' for constant enthalpy of formation model |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| [specie0].enthalpy_of_formation.constant  | Value of constant enthalpy of formation. [required if |  Real    |  None     |
|                                           | enthalpy of formation model='constant'].              |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+

Below is an example for specifying species solver model options.

.. code-block:: none

   species.solve = O2 H2O He

   species.O2.molecular_weight = 32.0
   species.H2O.molecular_weight = 18.01528
   species.He.molecular_weight = 4.0

   species.diffusivity = constant

   species.O2.diffusivity.constant = 1.9e-5
   species.H2O.diffusivity.constant = 2.4e-5
   species.He.diffusivity.constant = 7.1e-5

   species.specific_heat = constant

   species.O2.specific_heat.constant = 918.0
   species.H2O.specific_heat.constant = 4186.0
   species.He.specific_heat.constant = 1667.0

   species.enthalpy_of_formation = constant

   species.O2.enthalpy_of_formation.constant = 0
   species.H2O.enthalpy_of_formation.constant = -15861265.26  # J/kg
   species.He.enthalpy_of_formation.constant = 0


Fluid model settings
--------------------

Enabling the fluid solver and specifying fluid model options.

+----------------------+-------------------------------------------------------------------------+----------+-----------+
|                      | Description                                                             |   Type   | Default   |
+======================+=========================================================================+==========+===========+
| fluid.solve          | Specified name of the fluid or None to disable the fluid solver. The    | String   |  None     |
|                      | name assigned to the fluid solver is used to specify fluid inputs.      |          |           |
+----------------------+-------------------------------------------------------------------------+----------+-----------+


The following inputs must be preceded by the given to the fluid solver e.g., "fluid."

+------------------------------------------+---------------------------------------------------------+--------+----------+
|                                          | Description                                             | Type   | Default  |
+==========================================+=========================================================+========+==========+
| density                                  | Specify which density model to use for fluid            | String |  None    |
|                                          | [required]. Available options include:                  |        |          |
|                                          |                                                         |        |          |
|                                          | * 'constant' for constant density model                 |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| density.constant                         | Value of constant fluid density [required if density=   |  Real  |  None    |
|                                          | 'constant'].                                            |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| molecular_weight                         | Specify which molecular weight model to use for fluid.  | String | Constant |
|                                          | Available options include:                              |        |          |
|                                          |                                                         |        |          |
|                                          | * 'constant' for constant molecular weight model        |        |          |
|                                          | * 'mixture' for species-mixture molecular weight model  |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| molecular_weight.constant                | Value of constant fluid molecular weight [required if   |  Real  |    0     |
|                                          | molecular_weight='constant'].                           |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| viscosity                                | Specify which viscosity model to use for fluid          | String |  None    |
|                                          | [required]. Available options include:                  |        |          |
|                                          |                                                         |        |          |
|                                          | * 'constant' for constant viscosity model               |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| viscosity.constant                       | Value of constant fluid viscosity [required if          |  Real  |  None    |
|                                          | viscosity_model='constant'].                            |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| specific_heat                            | Specify which specific heat model to use for fluid      | String |  None    |
|                                          | [required if advect_enthalpy]. Available options        |        |          |
|                                          | include:                                                |        |          |
|                                          |                                                         |        |          |
|                                          | * 'constant' for constant specific heat model           |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| specific_heat.constant                   | Value of constant fluid specific heat [required if      |  Real  |  None    |
|                                          | specific_heat_model='constant'].                        |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| thermal_conductivity                     | Specify which thermal conductivity model to use for     | String |  None    |
|                                          | fluid [required if advect_enthalpy=1]. available        |        |          |
|                                          | options include:                                        |        |          |
|                                          |                                                         |        |          |
|                                          | * 'constant' for constant thermal conductivity model    |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| thermal_conductivity.constant            | Value of constant fluid thermal conductivity [required  |  Real  |  None    |
|                                          | if thermal_conductivity_model='constant'].              |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| reference_temperature                    | Value of the reference temperature used for specific    |  Real  |  0       |
|                                          | enthalpy                                                |  Real  |  0       |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| species                                  | Specify which species can constitute the fluid phase    | String |  None    |
|                                          | [defined species must be a subset of the species.solve  |        |          |
|                                          | arguments]                                              |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| species.[species0].specific_heat         | Specify species0 specific heat if it is different than  |  Real  |  0       |
|                                          | the value specified in the species model settings       |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+
| species.[species0].enthalpy_of_formation | Specify species0 enthalpy of formation if it is         |  Real  |  0       |
|                                          | different than the value specified in the species       |        |          |
|                                          | model settings                                          |        |          |
+------------------------------------------+---------------------------------------------------------+--------+----------+

Below is an example for specifying fluid solver model options.

.. code-block:: none

   fluid.solve = myfluid

   myfluid.density = constant
   myfluid.density.constant = 1.0

   myfluid.molecular_weight = mixture

   myfluid.viscosity = constant
   myfluid.viscosity.constant = 1.8e-5

   myfluid.specific_heat = constant
   myfluid.specific_heat.constant = 918

   myfluid.thermal_conductivity = constant
   myfluid.thermal_conductivity.constant = 0.024

   myfluid.reference_temperature = 298.15

   myfluid.species = O2 He

   # this is optional. it has to be specified in case it is different than 
   # the value passed in the species section
   myfluid.species.O2.specific_heat = 918.0
   myfluid.species.He.specific_heat = 1667.0

   # this is optional. it has to be specified in case it is different than 
   # the value passed in the species section
   myfluid.species.O2.enthalpy_of_formation = 0
   myfluid.species.He.enthalpy_of_formation = 0


Solids model settings
---------------------

Enabling the SOLIDS solver and specifying options common to both DEM and PIC
models.

+-------------------------+----------------------------------------------------------------------+----------+-----------+
|                         | Description                                                          |   Type   | Default   |
+=========================+======================================================================+==========+===========+
| solids.types            | Specified name(s) of the SOLIDS types or None to disable the SOLIDS  | String   |  None     |
|                         | solver. The user defined names are used to specify DEM and/or PIC    |          |           |
|                         | model inputs.                                                        |          |           |
+-------------------------+----------------------------------------------------------------------+----------+-----------+

The following inputs define the single solids properties.

+---------------------------------------------------+-----------------------------------------+----------+-----------+
|                                                   | Description                             |   Type   | Default   |
+===================================================+=========================================+==========+===========+
| [solid0].molecular_weight                         | Specify which molecular weight model to |  String  |  Constant |
|                                                   | use for solid. Available options        |          |           |
|                                                   | include:                                |          |           |
|                                                   |                                         |          |           |
|                                                   | * 'constant' for constant molecular     |          |           |
|                                                   |   weight model                          |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].molecular_weight.constant                | Value of constant solid molecular       |  Real    |  0        |
|                                                   | weight [required if molecular_weight =  |          |           |
|                                                   | 'constant'].                            |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].specific_heat                            | Specify which specific heat model to    |  String  |  None     |
|                                                   | use for solid. Available options        |          |           |
|                                                   | include:                                |          |           |
|                                                   |                                         |          |           |
|                                                   | * 'constant' for constant specific heat |          |           |
|                                                   |   model                                 |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].specific_heat.constant                   | Value of species molecular weight.      |  Real    |  0        |
|                                                   | [required if fluid.specific_heat =      |          |           |
|                                                   | 'constant'].                            |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].reference_temperature                    | Value of the reference temperature used |  Real    |  0        |
|                                                   | for specific enthalpy                   |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].species                                  | Specify which species can constitute    |  String  |  None     |
|                                                   | the fluid phase [defined species must   |          |           |
|                                                   | be a subset of the species.solve        |          |           |
|                                                   | arguments].                             |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].species.[species0].specific_heat         | Specify species0 specific heat if it is |  Real    |  0        |
|                                                   | different than the value specified in   |          |           |
|                                                   | the species model settings              |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+
| [solid0].species.[species0].enthalpy_of_formation | Specify species0 enthalpy of formation  |  Real    |  0        |
|                                                   | if it is different than the value       |          |           |
|                                                   | specified in the species model settings |          |           |
+---------------------------------------------------+-----------------------------------------+----------+-----------+

Below is an example for specifying the solids solver model options.

.. code-block:: none

   solids.types = mysolid

   mysolid.molecular_weight = constant
   mysolid.molecular_weight.constant = 18.01528

   mysolid.reference_temperature = 298.15

   mysolid.specific_heat = constant
   mysolid.specific_heat.constant = 4186

   mysolid.species = H2O

   # this is optional. it has to be specified in case it is different than 
   # the value passed in the species section
   mysolid.species.H20.specific_heat = 4186.0

   # this is optional. it has to be specified in case it is different than 
   # the value passed in the species section
   mysolid.species.H2O.enthalpy_of_formation = -15861265.26


Chemical Reactions model settings
---------------------------------

Enabling the Chemical Reactions solver and specifying model options.

+-------------------------+----------------------------------------------------------------------+----------+-----------+
|                         | Description                                                          |   Type   | Default   |
+=========================+======================================================================+==========+===========+
| chemistry.solve         | Specified name(s) of the chemical reactions types or None to disable | String   |  None     |
|                         | the reactions solver.                                                |          |           |
+-------------------------+----------------------------------------------------------------------+----------+-----------+

The following inputs must be preceded by the "chemistry." prefix

+------------------------+---------------------------------------------------------+----------+-----------+
|                        | Description                                             |   Type   | Default   |
+========================+=========================================================+==========+===========+
| [reaction0].reaction   | Chemical formula for the given reaction. The string     |  String  |  None     |
|                        | given as input must not contain white spaces and        |          |           |
|                        | the reaction direction has to be specified as '-->'     |          |           |
|                        | or '<--'. Chemical species phases must be defined as    |          |           |
|                        | '(g)' for the fluid phase or '(s)' for the solid phase. |          |           |
+------------------------+---------------------------------------------------------+----------+-----------+

.. code-block:: none

   chemistry.solve = myreaction0 myreaction1

   myreaction0.reaction = CH4(g)+2O2(g)-->CO2(g)+2H2O(g)
   myreaction1.reaction = C(s)+0.5O2(g)-->CO(g)


DEM model settings
------------------

Enabling the DEM solver and specifying model options.

+-------------------------+-------------------------------------------------------------------------+----------+-----------+
|                         | Description                                                             |   Type   | Default   |
+=========================+=========================================================================+==========+===========+
| dem.solve               | Specified name(s) of the DEM types or None to disable the DEM solver.   | String   |  None     |
|                         | The user defined names are used to specify DEM model inputs.            |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.friction_coeff.pp   | Friction coefficient :: particle to particle collisions [required]      | Real     |  None     |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.friction_coeff.pw   | Friction coefficient :: particle to wall collisions [required]          | Real     |  None     |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_const.pp     | Normal spring constant :: particle to particle collisions [required]    | Real     |  None     |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_const.pw     | Normal spring constant :: particle to wall collisions [required]        | Real     |  None     |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_tang_fac.pp  | Tangential-to-normal spring constant factor :: particle to particle     | Real     |  None     |
|                         | collisions [required]                                                   |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_tang_fac.pw  | Tangential-to-normal spring constant factor :: particle to wall         | Real     |  None     |
|                         | collisions [required]                                                   |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.damping_tang_fac.pp | Factor relating the tangential damping coefficient to the normal        | Real     |  None     |
|                         | damping coefficient :: particle to particle collisions [required]       |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.damping_tang_fac.pw | Factor relating the tangential damping coefficient to the normal        | Real     |  None     |
|                         | damping coefficient :: particle to wall collisions [required]           |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+

The following inputs use the DEM type names specified using the `dem.solve` input to define restitution coefficients and
are proceeded with `dem.restitution_coeff`. These must be defined for all solid-solid and solid-wall combinations.

+-------------------------+-------------------------------------------------------------------------+----------+-----------+
|                         | Description                                                             |   Type   | Default   |
+=========================+=========================================================================+==========+===========+
| [solid0].[solid1]       | Specifies the restitution coefficient between solid0 and solid1. Here   | Real     |  None     |
|                         | the order is not important and could be defined as [solid1].[solid0]    |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| [solid0].wall           | Specifies the restitution coefficient between solid0 and the wall.      | Real     |  None     |
|                         | Order is not important and this could be defined as wall.[solid0]       |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+

Below is an example for specifying the inputs for two DEM solids.

.. code-block:: none

   dem.solve = sand  char

   dem.friction_coeff.pp     =     0.25
   dem.friction_coeff.pw     =     0.15

   dem.spring_const.pp       =   100.0
   dem.spring_const.pw       =   100.0

   dem.spring_tang_fac.pp    =     0.2857
   dem.spring_tang_fac.pw    =     0.2857

   dem.damping_tang_fac.pp   =     0.5
   dem.damping_tang_fac.pw   =     0.5

   dem.restitution_coeff.sand.sand =  0.85
   dem.restitution_coeff.sand.char =  0.88
   dem.restitution_coeff.char.char =  0.90

   dem.restitution_coeff.sand.wall =  0.85
   dem.restitution_coeff.char.wall =  0.89


Region definitions
------------------

Regions are used to define sections of the domain. They may be either boxes, planes or points. They are used in building initial condition regions.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| mfix.regions        | Names given to regions.                                               | String      | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| regions.[region].lo | Low corner of physical region (physical, not index space)             |   Reals     | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| regions.[region].hi | High corner of physical region (physical, not index space)            |   Reals     | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

Below is an example for specifying two regions.

.. code-block:: none

   mfix.regions  = full-domain   riser

   regions.full-domain.lo = 0.0000  0.0000  0.0000
   regions.full-domain.hi = 3.7584  0.2784  0.2784

   regions.riser.lo       = 0.0000  0.0000  0.0000
   regions.riser.hi       = 0.1000  0.2784  0.2784



Initial Conditions
------------------

Initial conditions are built from defined regions. The input names are built using the prefix `ic.`, the name of the
region to apply the IC, and the name of the phase (e.g., `myfluid`).

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| ic.regions          | Regions used to define initial conditions.                            | String      | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

For a fluid phase, the following inputs can be defined.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| volfrac             | Volume fraction [required]                                            | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| pressure            | Fluid pressure                                                        | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| temperature         | Fluid temperature                                                     | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| velocity            | Velocity components                                                   | Reals       | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| species.[species0]  | Species 'species0' mass fraction                                      | Reals       | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+


The name of the DEM phases to be defined in the IC region and the packing must be defined.

+---------------------+----------------------------------------------------------------+-------------+-----------+
|                     | Description                                                    |   Type      | Default   |
+=====================+================================================================+=============+===========+
| ic.[region].solids  | List of solids                                                 | Strings     | None      |
+---------------------+----------------------------------------------------------------+-------------+-----------+
| ic.[region].packing | Specifies how auto-generated particles are placed in the IC    | String      | None      |
|                     | region:                                                        |             |           |
|                     |                                                                |             |           |
|                     | * hcp -- hex-centered packing                                  |             |           |
|                     | * random -- random packing                                     |             |           |
|                     | * pseudo_random                                                |             |           |
|                     | * oneper -- one particle per cell                              |             |           |
|                     | * eightper -- eight particles per cell                         |             |           |
+---------------------+----------------------------------------------------------------+-------------+-----------+

For each solid, the following inputs may be defined.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| volfrac             | Volume fraction                                                       | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| temperature         | Fluid temperature                                                     | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| species.[species0]  | Species 'species0' mass fraction                                      | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| velocity            | Velocity components                                                   | Reals       | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter            | Method to specify particle diameter in the IC region. This is         | String      | None      |
|                     | only used for auto-generated particles. Available options include:    |             |           |
|                     |                                                                       |             |           |
|                     | * 'constant'  -- specified constant                                   |             |           |
|                     | * 'uniform'   -- uniform distribution                                 |             |           |
|                     | * 'normal'    -- normal distribution                                  |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.constant   | Value of specified constant particle density                          | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.mean       | Distribution mean                                                     | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.std        | Distribution standard deviation                                       | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.min        | Minimum diameter to clip distribution                                 | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.max        | Maximum diameter to clip distribution                                 | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density             | Method to specify particle density in the IC region. This is          | String      | None      |
|                     | only used for auto-generated particles. Available options include:    |             |           |
|                     |                                                                       |             |           |
|                     | * 'constant'  -- specified constant                                   |             |           |
|                     | * 'uniform'   -- uniform distribution                                 |             |           |
|                     | * 'normal'    -- normal distribution                                  |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.constant    | Value of specified constant particle density                          | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.mean        | Distribution mean                                                     | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.std         | Distribution standard deviation                                       | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.min         | Minimum density to clip distribution                                  | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.max         | Maximum density to clip distribution                                  | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+


Below is an example for specifying an initial condition for a fluid (fluid) and one DEM solid (solid0).

.. code-block:: none

   ic.regions  = bed

   ic.bed.fluid.volfrac   =  0.725

   ic.bed.fluid.velocity  =  0.015  0.00  0.00
   ic.bed.fluid.temperature =  383.0
   ic.bed.fluid.species.H20 =  0.3
   ic.bed.fluid.species.He =  0.2
   ic.bed.fluid.species.O2 =  0.5

   ic.bed.solids  = solid0
   ic.bed.packing = pseudo_random

   ic.bed.solid0.volfrac  =  0.275
   ic.bed.solid0.temperature  =  400.0
   ic.bed.solid0.species.C  =  0.4
   ic.bed.solid0.species.H20  =  0.6

   ic.bed.solid0.velocity =  0.00  0.00  0.00

   ic.bed.solid0.diameter = constant
   ic.bed.solid0.diameter.constant =  100.0e-6

   ic.bed.solid0.density  = constant
   ic.bed.solid0.density.constant  = 1000.0



Boundary Conditions
-------------------

Boundary conditions are built from defined regions. The input names are built using the prefix `bc.`, the name of the
region to apply the BC, and the name of the phase (e.g., `myfluid`).

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| bc.regions          | Regions used to define boundary conditions.                           | String      | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

The type of the boundary conditions in the BC region must be defined.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| bc.[region]         | Used to define boundary condition type. Available options include:    |  String     |  None     |
|                     |                                                                       |             |           |
|                     | * 'pi'  for pressure inflow BC type                                   |             |           |
|                     | * 'po'  for pressure outflow BC type                                  |             |           |
|                     | * 'mi'  for mass inflow BC type                                       |             |           |
|                     | * 'nsw' for no-slip wall BC type                                      |             |           |
|                     | * 'eb'  for setting inhomogeneous Dirichlet BCs on the contained EBs  |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

For a fluid phase, the following inputs can be defined.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| volfrac             | Volume fraction [required if bc_region_type='mi']                     | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| pressure            | Fluid pressure [required if bc_region_type='po' or 'pi']              | Real        | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| temperature         | Fluid temperature [required if bc_region_type='mi' or 'pi']           | Real        | 0.0       |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| velocity            | Velocity components [required if bc_region_type='mi']                 | Reals       | None      |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| delp_dir            | Direction for specified pressure drop. Note that this direction       | Int         | 0         |
|                     | should also be periodic.                                              |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| delp                | Pressure drop (Pa)                                                    | Real        | 0.0       |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| species.[species0]  | Species 'species0' mass fraction [required if advect_fluid_species=1  | Real        | None      |
|                     | and bc_region_type='mi' or 'pi'].                                     |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

Below is an example for specifying boundary conditions for a fluid `myfluid`.

.. code-block:: none

   bc.regions = inflow outflow

   bc.inflow = mi
   bc.inflow.myfluid.volfrac     =  1.0
   bc.inflow.myfluid.velocity    =  0.015  0.0  0.0
   bc.inflow.myfluid.temperature =  300
   bc.inflow.myfluid.species.O2  =  0.0
   bc.inflow.myfluid.species.CO  =  0.5
   bc.inflow.myfluid.species.H2O =  0.0
   bc.inflow.myfluid.species.He  =  0.5

   bc.outflow = po
   bc.outflow.myfluid.pressure =  0.0


Transient Boundary Conditions
-----------------------------

Velocity, temperature, and pressure boundary conditions may also be specified as a 
function of time simply by adding a new column. The time value is entered in the 
new first column. We can make the `mi` boundary condition above time-dependent 
by replacing: 

.. code-block:: none

   bc.inflow.myfluid.velocity    =  0.0  0.0    0.0  0.0
   bc.inflow.myfluid.velocity    =  3.0  0.015  0.0  0.0
   bc.inflow.myfluid.temperature =  0.0  300
   bc.inflow.myfluid.temperature =  2.99 300
   bc.inflow.myfluid.temperature =  3.0  500
   bc.inflow.myfluid.temperature =  4.0  500
   bc.inflow.myfluid.temperature =  4.01 300

In the above example, the inflow velocity is accelerated from zero to its  
final value over a period of three seconds. Linear interpolation is used in 
between discrete time values and held constant at the last time value. The 
temperature sees an abrupt spike from 300 up to 500 at t = 3s and then back 
down again after 4s. Note that the timestep is not adjusted to sync with 
transient BCs.  


Boundary Conditions on Embedded Boundaries
------------------------------------------

In MFIX-Exa it is possible to set boundary conditions on the embedded
boundaries. For instance, it is possible to set inhomogeneous Dirichlet boundary
conditions for the fluid temperature variable on the subpart of the embedded
boundaries which is contained in the BC region (which in this case has to be
tridimensional). We recall that, on the remaining part of the EBs, homogeneous
Neumann boundary conditions are assumed by default.

In the following table there is a list of the possible entries for EB boundary
conditions. Each entry must be preceded by `bc.[region0].`

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| eb.temperature      | Inhomogeneous Dirichlet BC value for temperature on EBs contained in  | Real        | 0.0       |
|                     | the (tridimensional) region [required if advect_enthalpy=1 and        |             |           |
|                     | bc_region_type='eb'].                                                 |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

Below is an example for specifying boundary conditions for a fluid `myfluid`.

.. code-block:: none

   bc.regions = hot-wall

   bc.hot-walls = eb
   bc.hot-walls.eb.temperature = 800
