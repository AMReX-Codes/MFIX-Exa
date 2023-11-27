.. _Chap:InputsHypre:

Hypre Inputs
=============

The following inputs control the hypre settings and are read directly 
by AMReX when we use hypre as the bottom solver, i.e., when 
:cpp:`nodal_proj.bottom_solver = hypre` and/or when 
:cpp:`mac_proj.bottom_solver = hypre` (see :ref:`Chap:InputsMultigrid`)
These settings must be preceded by the hypre_namespace setting corresponding 
to the solver (see :ref:`Chap:InputsMultigrid`).

NOTE: By default, the MAC and nodal projections use the same settings 
specified with the namespace :cpp:`hypre`, however the solvers can be configured 
separately by specifying :cpp:`mac_proj.hypre_namespace` and :cpp:`nodal_proj.hypre_namespace`.

When not using the default namespace :cpp:`hypre`, additional restrictions apply:

#. Both :cpp:`mac_proj.hypre_namespace` and :cpp:`nodal_proj.hypre_namespace` must be set.

#. :cpp:`mac_proj.hypre_namespace` and :cpp:`nodal_proj.hypre_namespace` must be unique.   


+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
|                                   |  Description                                                          |   Type      | Default      |
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| verbose                           |  Verbosity of hypre                                                   |   Int       |   0          |
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| adjust_singular_matrix            |  Should be true if the problem to be solved has singular matrix       |   Bool      |   false      | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| hypre_solver                      |  Type of hypre solver                                                 |   String    |  BoomerAMG   |
|                                   |                                                                       |             |              |
|                                   |  Options are BoomerAMG, GMRES, COGMRES, LGMRES, FlexGMRES, BiCGSTAB,  |             |              |
|                                   |  PCG or Hybrid                                                        |             |              |
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| hypre_preconditioner              |  Type of preconditioner                                               |   String    |   none       |
|                                   |                                                                       |             |              |
|                                   |  Options are BoomerAMG or euclid                                      |             |              |
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| recompute_preconditioner          |  Recompute preconditioner during runs                                 |    Bool     |   true       | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| write_matrix_files                |  Write out matrix into text files                                     |    Bool     |   false      | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| overwrite_existing_matrix_files   |  Over-write existing matrix files                                     |    Bool     |   false      | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_verbose                      |  Verbosity of BoomerAMG preconditioner                                |    Int      |   0          | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_logging                      |  When using BoomerAMG preconditioner                                  |    Int      |   0          | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetLogging                                        |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_coarsen_type                 |  When using BoomerAMG preconditioner                                  |    Int      |   6          | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetCoarsenType                                    |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_cycle_type                   |  When using BoomerAMG preconditioner                                  |    Int      |   1          | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetCycleType                                      |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_relax_type                   |  When using BoomerAMG preconditioner                                  |    Int      |   6          | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetRelaxType                                      |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_relax_order                  |  When using BoomerAMG preconditioner                                  |    Int      |   1          | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetRelaxOrder                                     |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_num_sweeps                   |  When using BoomerAMG preconditioner                                  |    Int      |   2          | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetNumSweeps                                      |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_max_levels                   |  When using BoomerAMG preconditioner                                  |    Int      |   20         | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetMaxLevels                                      |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_strong_threshold             |  When using BoomerAMG preconditioner                                  |    Real     |   0.57       | 
|                                   |                                                                       |             |              | 
|                                   |  See HYPRE_BoomerAMGSetStrongThreshold                                |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bamg_interp_type                  |  When using BoomerAMG preconditioner                                  |    Int      |   0          | 
|                                   |                                                                       |             |              | 
|                                   |  HYPRE_BoomerAMGSetInterpType                                         |             |              | 
+-----------------------------------+-----------------------------------------------------------------------+-------------+--------------+
