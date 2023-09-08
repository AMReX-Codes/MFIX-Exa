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

+------------------------+-------------------------------------------------------------------+----------+---------------------+
|                        | Description                                                       |   Type   | Default             |
+========================+===================================================================+==========+=====================+
| geometry               | Which type of amrex EB geometry are we using?                     |   String |                     |
|                        |                                                                   |          |                     |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| geometry_filename      | The CSG file that defines the EB geometry                         |   String |                     |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| levelset__refinement   | Refinement factor of levelset resolution relative to level 0      |   Int    | 1                   |
|                        | resolution                                                        |          |                     |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| gravity                | Gravity vector (e.g., mfix.gravity = -9.81  0.0  0.0) [required]  |   Reals  | 0 0 0               |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| advect_density         | Switch for turning ON (1) or OFF (0) fluid density evolution      |   Int    | 0                   |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| advect_enthalpy        | Switch for turning ON (1) or OFF (0) fluid temperature evolution  |   Int    | 0                   |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| solve_species          | Switch for turning ON (1) or OFF (0) fluid species mass fraction  |   Int    | 0                   |
|                        | evolution                                                         |          |                     |
+------------------------+-------------------------------------------------------------------+----------+---------------------+
| constraint_type        | Select which constraint to apply to the problem.                  |   String | IncompressibleFluid |
|                        | Available options include:                                        |          |                     |
|                        |                                                                   |          |                     |
|                        | * 'incompressiblefluid' for incompressibility constraint          |          |                     |
|                        | * 'idealgasopensystem' for Ideal Gas-Open System constraint       |          |                     |
|                        | * 'idealgasclosedsystem' for Ideal Gas-Closed System constraint   |          |                     |
+------------------------+-------------------------------------------------------------------+----------+---------------------+


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
| diffusivity.constant                      | Value of constant species diffusivity. [required if   |  Real    |  0        |
|                                           | diffusivity_model='constant'].                        |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| specific_heat                             | Specify which specific heat model to use for species  | String   |  None     |
|                                           | [required if fluid.molecular_weight='mixture'].       |          |           |
|                                           | Available options include:                            |          |           |
|                                           |                                                       |          |           |
|                                           | * 'constant' for constant specific heat model         |          |           |
|                                           | * 'nasa7-poly' for NASA7 Polynomials model            |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| [specie0].specific_heat.constant          | Value of constant species diffusivity. [required if   |  Real    |  0        |
|                                           | diffusivity model='constant'].                        |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| [specie0].specific_heat.NASA7.a[i]        | Value of i-th coefficient, with i=0,..,6 for NASA7    |  Real    |  0        |
|                                           | polynomial coefficient [required if specific heat     |          |           |
|                                           | model='NASA7-Poly'].                                  |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+
| [specie0].enthalpy_of_formation           | Value of constant enthalpy of formation. [required if |  Real    |  0        |
|                                           | specific heat model='constant'].                      |          |           |
+-------------------------------------------+-------------------------------------------------------+----------+-----------+

Below is an example for specifying species solver model options.

.. code-block:: none

   species.solve = O2  CO  CO2  Fe2O3  FeO

   species.diffusivity = constant
   species.diffusivity.constant = 1.9e-5

   species.specific_heat = NASA7-poly

   # Oxygen
   species.O2.molecular_weight = 31.99880e-3
   species.O2.specific_heat.NASA7.a0 =  3.78245636E+00    3.66096065E+00
   species.O2.specific_heat.NASA7.a1 = -2.99673416E-03    6.56365811E-04
   species.O2.specific_heat.NASA7.a2 =  9.84730201E-06   -1.41149627E-07
   species.O2.specific_heat.NASA7.a3 = -9.68129509E-09    2.05797935E-11
   species.O2.specific_heat.NASA7.a4 =  3.24372837E-12   -1.29913436E-15
   species.O2.specific_heat.NASA7.a5 = -1.06394356E+03   -1.21597718E+03

   # Carbon monoxide
   species.CO.molecular_weight = 28.01040e-3
   species.CO.specific_heat.NASA7.a0 =  3.57953350E+00    3.04848590E+00
   species.CO.specific_heat.NASA7.a1 = -6.10353690E-04    1.35172810E-03
   species.CO.specific_heat.NASA7.a2 =  1.01681430E-06   -4.85794050E-07
   species.CO.specific_heat.NASA7.a3 =  9.07005860E-10    7.88536440E-11
   species.CO.specific_heat.NASA7.a4 = -9.04424490E-13   -4.69807460E-15
   species.CO.specific_heat.NASA7.a5 = -1.43440860E+04   -1.42661170E+04

   # Carbon dioxide
   species.CO2.molecular_weight = 44.00980e-3
   species.CO2.specific_heat.NASA7.a0 =  2.35681300E+00    4.63651110E+00
   species.CO2.specific_heat.NASA7.a1 =  8.98412990E-03    2.74145690E-03
   species.CO2.specific_heat.NASA7.a2 = -7.12206320E-06   -9.95897590E-07
   species.CO2.specific_heat.NASA7.a3 =  2.45730080E-09    1.60386660E-10
   species.CO2.specific_heat.NASA7.a4 = -1.42885480E-13   -9.16198570E-15
   species.CO2.specific_heat.NASA7.a5 = -4.83719710E+04   -4.90249040E+04

   # Hematite
   species.Fe2O3.molecular_weight = 159.68820e-3
   species.Fe2O3.specific_heat.NASA7.a0 =  1.52218166E-01    2.09445369E+01
   species.Fe2O3.specific_heat.NASA7.a1 =  6.70757040E-02    0.00000000E+00
   species.Fe2O3.specific_heat.NASA7.a2 = -1.12860954E-04    0.00000000E+00
   species.Fe2O3.specific_heat.NASA7.a3 =  9.93356662E-08    0.00000000E+00
   species.Fe2O3.specific_heat.NASA7.a4 = -3.27580975E-11    0.00000000E+00
   species.Fe2O3.specific_heat.NASA7.a5 = -1.01344092E+05   -1.07936580E+05

   # Wustite
   species.FeO.molecular_weight = 71.84440e-3
   species.FeO.specific_heat.NASA7.a0 =  3.68765953E+00    1.81588527E+00
   species.FeO.specific_heat.NASA7.a1 =  1.09133433E-02    1.70742829E-02
   species.FeO.specific_heat.NASA7.a2 = -1.61179493E-05   -2.39919190E-05
   species.FeO.specific_heat.NASA7.a3 =  1.06449256E-08    1.53690046E-08
   species.FeO.specific_heat.NASA7.a4 = -2.39514915E-12   -3.53442390E-12
   species.FeO.specific_heat.NASA7.a5 = -3.34867527E+04   -3.30239565E+04


Fluid model settings
--------------------

Enabling the fluid solver and specifying fluid model options.
The following inputs must be preceded by the given to the fluid solver e.g., "fluid."

+------------------------------------------+----------------------------------------------------------+--------+----------+
|                                          | Description                                              |  Type  | Default  |
+==========================================+==========================================================+========+==========+
| solve                                    | Specify the names of the fluids or None to disable the   | String |  None    |
|                                          | fluid solver. The name assigned to the fluid solver is   |        |          |
|                                          | used to specify fluids inputs.                           |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| molecular_weight                         | Value of constant fluid molecular weight                 |  Real  |    0     |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| viscosity                                | Specify which viscosity model to use for fluid           | String |  None    |
|                                          | [required]. Available options include:                   |        |          |
|                                          |                                                          |        |          |
|                                          | * 'constant' for constant viscosity model                |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| viscosity.constant                       | Value of constant fluid viscosity [required if           |  Real  |  0       |
|                                          | viscosity_model='constant'].                             |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| specific_heat                            | Specify which specific heat model to use for fluid       | String |  None    |
|                                          | [required if advect_enthalpy]. Available options         |        |          |
|                                          | include:                                                 |        |          |
|                                          |                                                          |        |          |
|                                          | * 'constant' for constant specific heat model            |        |          |
|                                          | * 'mixture' required when fluid is a mixture of species  |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| specific_heat.constant                   | Value of constant fluid specific heat [required if       |  Real  |  0       |
|                                          | specific_heat_model='constant'].                         |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| thermal_conductivity                     | Specify which thermal conductivity model to use for      | String |  None    |
|                                          | fluid [required if advect_enthalpy=1]. available         |        |          |
|                                          | options include:                                         |        |          |
|                                          |                                                          |        |          |
|                                          | * 'constant' for constant thermal conductivity model     |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| thermal_conductivity.constant            | Value of constant fluid thermal conductivity [required   |  Real  |  0       |
|                                          | if thermal_conductivity_model='constant'].               |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| thermodynamic_pressure                   | Value of the thermodynamic pressure [required if the     |  Real  |  0       |
|                                          | constraint type is IdealGasClosedSystem]                 |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| reference_temperature                    | Value of the reference temperature used for specific     |  Real  |  0       |
|                                          | enthalpy                                                 |  Real  |  0       |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| species                                  | Specify which species can constitute the fluid phase     | String |  None    |
|                                          | [defined species must be a subset of the species.solve   |        |          |
|                                          | arguments]                                               |        |          |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| newton_solver.absolute_tol               | Define absolute tolerance for Damped-Newton solver       |  Real  |  1.e-8   |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| newton_solver.relative_tol               | Define relative tolerance for Damped-Newton solver       |  Real  |  1.e-8   |
+------------------------------------------+----------------------------------------------------------+--------+----------+
| newton_solver.max_iterations             | Define max number of iterations for Damped-Newton solver |  int   |  500     |
+------------------------------------------+----------------------------------------------------------+--------+----------+

Below is an example for specifying fluid solver model options.

.. code-block:: none

   fluid.solve = my_fluid

   fluid.viscosity = constant
   fluid.viscosity.constant = 1.8e-5

   fluid.reference_temperature = 298.15

   fluid.thermal_conductivity = constant
   fluid.thermal_conductivity.constant = 0.024

   fluid.specific_heat = mixture

   fluid.species =  O2  CO  CO2


Solids model settings
---------------------

Enabling the SOLIDS solver and specifying options common to both DEM and PIC
models. The following inputs must be preceded by the "solids." root

+------------------------------------------+-------------------------------------------------------------+----------+----------+
|                                          | Description                                                 |   Type   | Default  |
+==========================================+=============================================================+==========+==========+
| types                                    | Specified name(s) of the SOLIDS types or None to disable    | String   |  None    |
|                                          | the SOLIDS solver. The user defined names are used to       |          |          |
|                                          | specify DEM and/or PIC model inputs.                        |          |          |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| molecular_weight                         | Value of constant solid molecular                           |  Real    |  0       |
|                                          | weight                                                      |          |          |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| specific_heat                            | Specify which specific heat model to                        |  String  |  None    |
|                                          | use for solid. Available options                            |          |          |
|                                          | include:                                                    |          |          |
|                                          |                                                             |          |          |
|                                          | * 'constant' for constant specific heat                     |          |          |
|                                          |   model                                                     |          |          |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| specific_heat.constant                   | Value of species molecular weight.                          |  Real    |  0       |
|                                          | [required if fluid.specific_heat =                          |          |          |
|                                          | 'constant'].                                                |          |          |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| reference_temperature                    | Value of the reference temperature used                     |  Real    |  0       |
|                                          | for specific enthalpy                                       |          |          |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| species                                  | Specify which species can constitute                        |  String  |  None    |
|                                          | the fluid phase [defined species must                       |          |          |
|                                          | be a subset of the species.solve                            |          |          |
|                                          | arguments].                                                 |          |          |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| newton_solver.absolute_tol               | Define absolute tolerance for Damped-Newton solver          |  Real    |  1.e-6   |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| newton_solver.relative_tol               | Define relative tolerance for Damped-Newton solver          |  Real    |  1.e-6   |
+------------------------------------------+-------------------------------------------------------------+----------+----------+
| newton_solver.max_iterations             | Define max number of iterations for Damped-Newton solver    |  int     |  100     |
+------------------------------------------+-------------------------------------------------------------+----------+----------+

Below is an example for specifying the solids solver model options.

.. code-block:: none

   solids.types = my_solid0  my_solid1

   solids.reference_temperature = 298.15

   solids.specific_heat = mixture

   solids.species = Fe2O3  FeO


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

   chemistry.solve = my_reaction0 my_reaction1

   my_reaction0.reaction = Fe2O3(s)+CO(g)-->2.FeO(s)+CO2(g)
   my_reaction1.reaction = FeO(s)+0.25O2(g)-->0.5Fe2O3(s)


DEM model settings
------------------

Enabling the DEM solver and specifying model options.

+-------------------------+-------------------------------------------------------------------------+----------+-----------+
|                         | Description                                                             |   Type   | Default   |
+=========================+=========================================================================+==========+===========+
| dem.solve               | Specified name(s) of the DEM types or None to disable the DEM solver.   | String   |  None     |
|                         | The user defined names are used to specify DEM model inputs.            |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.friction_coeff.pp   | Friction coefficient :: particle to particle collisions [required]      | Real     |  0        |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.friction_coeff.pw   | Friction coefficient :: particle to wall collisions [required]          | Real     |  0        |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_const.pp     | Normal spring constant :: particle to particle collisions [required]    | Real     |  0        |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_const.pw     | Normal spring constant :: particle to wall collisions [required]        | Real     |  0        |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_tang_fac.pp  | Tangential-to-normal spring constant factor :: particle to particle     | Real     |  0        |
|                         | collisions [required]                                                   |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.spring_tang_fac.pw  | Tangential-to-normal spring constant factor :: particle to wall         | Real     |  0        |
|                         | collisions [required]                                                   |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.damping_tang_fac.pp | Factor relating the tangential damping coefficient to the normal        | Real     |  0        |
|                         | damping coefficient :: particle to particle collisions [required]       |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| dem.damping_tang_fac.pw | Factor relating the tangential damping coefficient to the normal        | Real     |  0        |
|                         | damping coefficient :: particle to wall collisions [required]           |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+

The following inputs use the DEM type names specified using the `dem.solve` input to define restitution coefficients and
are proceeded with `dem.restitution_coeff`. These must be defined for all solid-solid and solid-wall combinations.

+-------------------------+-------------------------------------------------------------------------+----------+-----------+
|                         | Description                                                             |   Type   | Default   |
+=========================+=========================================================================+==========+===========+
| [solid0].[solid1]       | Specifies the restitution coefficient between solid0 and solid1. Here   | Real     |  0        |
|                         | the order is not important and could be defined as [solid1].[solid0]    |          |           |
+-------------------------+-------------------------------------------------------------------------+----------+-----------+
| [solid0].wall           | Specifies the restitution coefficient between solid0 and the wall.      | Real     |  0        |
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
| regions.[region].lo | Low corner of physical region (physical, not index space)             |   Reals     | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| regions.[region].hi | High corner of physical region (physical, not index space)            |   Reals     | 0         |
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
region to apply the IC, and the name of the phase (e.g., `myfluid`). The
following inputs must be preceded by the root `ic.`.

+-----------------------+------------------------------------------------------------------------+-------------+-----------+
|                       | Description                                                            |   Type      | Default   |
+=======================+========================================================================+=============+===========+
| regions               | Regions used to define initial conditions.                             | String      | None      |
+-----------------------+------------------------------------------------------------------------+-------------+-----------+
| allow_regions_overlap | Flag for allowing the user to decide whether particles will be         | Bool        | 1 (yes)   |
|                       | generated/initialized more than once on the areas where the IC regions |             |           |
|                       | have an intersection                                                   |             |           |
+-----------------------+------------------------------------------------------------------------+-------------+-----------+
| ranking_type          | IC regions are sorted during initialization. This input lets the user  | String      | Inputs    |
|                       | decide the ranking criterion, which can be one of the following:       |             |           |
|                       |                                                                        |             |           |
|                       | * inputs -- the order in the inputs file                               |             |           |
|                       | * volume -- the volume of each IC region                               |             |           |
|                       | * priority -- the priority value provided by the user in the inputs    |             |           |
+-----------------------+------------------------------------------------------------------------+-------------+-----------+

For a fluid phase, the following inputs can be defined.

+------------------------+------------------------------------------------------------------------+-------------+-----------+
|                        | Description                                                            |   Type      | Default   |
+========================+========================================================================+=============+===========+
| volfrac                | Volume fraction [required]                                             | Real        | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| density                | Fluid density                                                          | Real        | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| temperature            | Fluid temperature                                                      | Real        | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| velocity               | Velocity components                                                    | Reals       | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| species.[species0]     | Species 'species0' mass fraction                                       | Reals       | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+


The name of the DEM phases to be defined in the IC region and the packing must be defined.

+----------------------+------------------------------------------------------------------+-------------+-----------+
|                      | Description                                                      |   Type      | Default   |
+======================+==================================================================+=============+===========+
| ic.[region].solids   | Solids type in this IC region (only one type per region allowed) | String      | None      |
+----------------------+------------------------------------------------------------------+-------------+-----------+
| ic.[region].priority | Priority value for IC regions ranking as described above         | Int         | Max       |
+----------------------+------------------------------------------------------------------+-------------+-----------+
| ic.[region].packing  | Specifies how auto-generated particles are placed in the IC      | String      | None      |
|                      | region:                                                          |             |           |
|                      |                                                                  |             |           |
|                      | * hcp -- hex-centered packing                                    |             |           |
|                      | * random -- random packing                                       |             |           |
|                      | * pseudo_random                                                  |             |           |
|                      | * oneper -- one particle per cell                                |             |           |
|                      | * eightper -- eight particles per cell                           |             |           |
|                      | * n-cube -- n^3 particles per cell where n is an integer         |             |           |
|                      |                                                                  |             |           |
|                      | (NOTE: oneper is equivalent to 1-cube and eightper to 2-cube)    |             |           |
+----------------------+------------------------------------------------------------------+-------------+-----------+

For each solid, the following inputs may be defined.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| volfrac             | Volume fraction                                                       | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| temperature         | Fluid temperature                                                     | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| species.[species0]  | Species 'species0' mass fraction                                      | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| velocity            | Velocity components                                                   | Reals       | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter            | Method to specify particle diameter in the IC region. This is         | String      | None      |
|                     | only used for auto-generated particles. Available options include:    |             |           |
|                     |                                                                       |             |           |
|                     | * 'constant'  -- specified constant                                   |             |           |
|                     | * 'uniform'   -- uniform distribution                                 |             |           |
|                     | * 'normal'    -- normal distribution                                  |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.constant   | Value of specified constant particle density                          | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.mean       | Distribution mean                                                     | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.std        | Distribution standard deviation                                       | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.min        | Minimum diameter to clip distribution                                 | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| diameter.max        | Maximum diameter to clip distribution                                 | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density             | Method to specify particle density in the IC region. This is          | String      | None      |
|                     | only used for auto-generated particles. Available options include:    |             |           |
|                     |                                                                       |             |           |
|                     | * 'constant'  -- specified constant                                   |             |           |
|                     | * 'uniform'   -- uniform distribution                                 |             |           |
|                     | * 'normal'    -- normal distribution                                  |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.constant    | Value of specified constant particle density                          | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.mean        | Distribution mean                                                     | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.std         | Distribution standard deviation                                       | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.min         | Minimum density to clip distribution                                  | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| density.max         | Maximum density to clip distribution                                  | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+


Below is an example for specifying an initial condition for a fluid (fluid) and one DEM solid (solid0).

.. code-block:: none

   ic.regions  = bed0  bed1

   ic.bed0.my_fluid.volfrac   =  0.725
   ic.bed0.my_fluid.density   =  1.0
   ic.bed0.my_fluid.velocity  =  0.015  0.00  0.00
   ic.bed0.my_fluid.temperature =  383.0
   ic.bed0.my_fluid.species.CO  =  0.3
   ic.bed0.my_fluid.species.CO2 =  0.2
   ic.bed0.my_fluid.species.O2  =  0.5

   ic.bed0.solids  = my_solid0
   ic.bed0.packing = pseudo_random

   ic.bed0.my_solid0.volfrac  =  0.275
   ic.bed0.my_solid0.temperature  =  400.0
   ic.bed0.my_solid0.species.Fe2O3 =  0.4
   ic.bed0.my_solid0.species.FeO   =  0.6

   ic.bed0.my_solid0.velocity =  0.00  0.00  0.00

   ic.bed0.my_solid0.diameter = constant
   ic.bed0.my_solid0.diameter.constant =  100.0e-6

   ic.bed0.my_solid0.density  = constant
   ic.bed0.my_solid0.density.constant  = 1000.0

   ic.bed1.my_fluid.volfrac   =  0.925
   ic.bed1.my_fluid.density   =  1.0
   ic.bed1.my_fluid.velocity  =  0.015  0.00  0.00
   ic.bed1.my_fluid.temperature =  383.0
   ic.bed1.my_fluid.species.CO  =  0.5
   ic.bed1.my_fluid.species.CO2 =  0.5
   ic.bed1.my_fluid.species.O2  =  0.0

   ic.bed1.solids  = my_solid1
   ic.bed1.packing = pseudo_random

   ic.bed1.my_solid1.volfrac  =  0.075
   ic.bed1.my_solid1.temperature  =  450.0
   ic.bed1.my_solid1.species.Fe2O3 =  0.0
   ic.bed1.my_solid1.species.FeO   =  1.0

   ic.bed1.my_solid1.velocity =  0.10  0.00  0.00

   ic.bed1.my_solid1.diameter = constant
   ic.bed1.my_solid1.diameter.constant =  110.0e-6

   ic.bed1.my_solid1.density  = constant
   ic.bed1.my_solid1.density.constant  = 900.0


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
|                     | * 'eb'  for inhomogeneous Dirichlet BCs of temperature or fluid       |             |           |
|                     |   velocity (mass inflow) on the contained EBs                         |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| bc.po_no_par_out    | Let particles exit (default) or bounce-back at pressure outflows      |   Int       | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

For a fluid phase, the following inputs can be defined.

+------------------------+------------------------------------------------------------------------+-------------+-----------+
|                        | Description                                                            |   Type      | Default   |
+========================+========================================================================+=============+===========+
| volfrac                | Volume fraction [required if bc_region_type='mi']                      | Real        | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| density                | Fluid density [required if bc_region_type='mi' or 'pi']                | Real        | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| pressure               | Fluid pressure [required if bc_region_type='po' or 'pi']               | Real        | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| temperature            | Fluid temperature [required if bc_region_type='mi' or 'pi']            | Real        | 0.0       |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| velocity               | Velocity components [required if bc_region_type='mi']                  | Reals       | 0         |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| delp_dir               | Direction for specified pressure drop. Note that this direction        | Int         | 0         |
|                        | should also be periodic.                                               |             |           |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| delp                   | Pressure drop (Pa)                                                     | Real        | 0.0       |
+------------------------+------------------------------------------------------------------------+-------------+-----------+
| species.[species0]     | Species 'species0' mass fraction [required if solve_species=1          | Real        | 0         |
|                        | and bc_region_type='mi' or 'pi'].                                      |             |           |
+------------------------+------------------------------------------------------------------------+-------------+-----------+

Below is an example for specifying boundary conditions for a fluid `myfluid`.

.. code-block:: none

   bc.regions = inflow outflow

   bc.inflow = mi
   bc.inflow.my_fluid.volfrac     =  1.0
   bc.inflow.my_fluid.density     =  1.0
   bc.inflow.my_fluid.velocity    =  0.015  0.0  0.0
   bc.inflow.my_fluid.temperature =  300
   bc.inflow.my_fluid.species.O2  =  0.0
   bc.inflow.my_fluid.species.CO  =  0.5
   bc.inflow.my_fluid.species.CO2 =  0.5

   bc.outflow = po
   bc.outflow.myfluid.pressure =  0.0
   # In case of Ideal Gas EOS with Open System constraint
   # the thermodynamic pressure at outflow is required
   bc.outflow.thermodynamic_pressure = 356318.21


Transient Boundary Conditions
-----------------------------

Velocity, temperature, and pressure boundary conditions may also be specified as a 
function of time simply by adding a new column. The time value is entered in the 
new first column. We can make the `mi` boundary condition above time-dependent 
by replacing: 

.. code-block:: none

   bc.inflow.my_fluid.velocity    =  0.0  0.0    0.0  0.0
   bc.inflow.my_fluid.velocity    =  3.0  0.015  0.0  0.0
   bc.inflow.my_fluid.temperature =  0.0  300
   bc.inflow.my_fluid.temperature =  2.99 300
   bc.inflow.my_fluid.temperature =  3.0  500
   bc.inflow.my_fluid.temperature =  4.0  500
   bc.inflow.my_fluid.temperature =  4.01 300

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

In addition to the temperature, it is possible to set an inflow condition for fluid
on an embedeed boundary. We recall that, on the remaining part of the EBs,
no slip velocity conditions are assumed by default.

In the following table there is a list of the possible entries for inflow EB boundary
conditions. Each entry must be preceded by `bc.[region0].` Like traditional mass
inflows, the fluid temperature, pressure, and species composition must be
provided when appropriate.

+---------------------+-----------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                           |   Type      | Default   |
+=====================+=======================================================================+=============+===========+
| fluid.velocity      | (Required if not `volflow`) Inflow fluid velocity on EB faces         | Reals       | 0         |
|                     | contained in the (tridimensional) region.                             |             |           |
|                     | Note that if only one value is specified, that is assumed to          |             |           |
|                     | be the magnitude in the direction of the EB face's normal.            |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| fluid.volflow       | (Required if not `velocity`) Inflow BC for fluid volumetric flow      | Real        | 0         |
|                     | rate in the (tridimensional) region. The flow is assumed to be        |             |           |
|                     | normal to the EB surface in the region.                               |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| fluid.volfrac       | (Required) Volume fraction.                                           | Real        | 0         |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| eb.normal           | (Optional) When specified, only cells with EB face normal that is     | Reals       | 0         |
|                     | parallel and opposite in direction to the specified values            |             |           |
|                     | are imposed with the inflow velocity.                                 |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+
| eb.normal_tol       | (Optional) Used in conjunction with `eb.normal`. It determines the    | Real        | 0         |
|                     | tolerance (in degrees) for choosing cells with a specific normal.     |             |           |
+---------------------+-----------------------------------------------------------------------+-------------+-----------+

Below is an example for specifying a normal inflow velocity magnitude for a region `eb-flow`.

.. code-block:: none

   bc.regions = eb-flow

   bc.eb-flow = eb

   bc.eb-flow.my_fluid.volfrac  = 1.0
   bc.eb-flow.my_fluid.velocity = 0.1

Below is an example where only specific cells are imposed a velocity in the x-direction.

.. code-block:: none

   bc.regions = eb-flow

   bc.eb-flow = eb

   bc.eb-flow.eb.normal_tol = 3.0
   bc.eb-flow.eb.normal =  0.9848  0.0000  0.1736  # 10 deg

   bc.eb-flow.my_fluid.volfrac  = 1.0
   bc.eb-flow.my_fluid.velocity = 0.1  0.0  0.0
