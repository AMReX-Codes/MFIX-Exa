.. _Chap:Inputs:

Run-time Inputs
===============

Run-time inputs are used to control the simulation setup such as the grid,
solver settings, geometry, boundary conditions etc. These ``<key> = <value(s)>``
pairs are saved in a text file, with any file name, that is passed to the
MFiX-Exa executable at run time:

.. code-block:: shell

   ./mfix my_project.inputs

.. note::
   Traditionally, input files have been named ``inputs``. However, it is
   recommended that you provide a descriptive name with an extension of
   ``.inputs`` such as ``fluid_bed.inputs``

The input text file looks something like this:

.. code-block::

   # Run settings
   mfix.stop_time = 10.0 # inline comment

   # Solver settings
   nodal_proj.verbose = 0
   nodal_proj.maxiter = 1000

where comments are denoted with a ``#``. If a value is not specified for a key,
the default value will be used.

The following sections contain information addressing the input keywords and
values for setting up a problem. Pay special attention to any prefixes for the
keywords such as ``mfix``, ``amr``, ``geometry``, ``nodal_proj`` etc.

.. toctree::
   :maxdepth: 1

   inputs/InputsProblemDefinition
   inputs/InputsCoupling
   inputs/InputsTimeStepping
   inputs/InputsDiscretization 
   inputs/InputsInitialization
   inputs/InputsLoadBalancing
   inputs/InputsMultigrid
   inputs/InputsPlotFiles
   inputs/InputsCheckpoint
   inputs/InputsMonitors
   inputs/InputsVerbosity
