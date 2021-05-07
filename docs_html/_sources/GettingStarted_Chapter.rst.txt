.. _Chap:GettingStarted:

Getting Started
===============

The MFiX-Exa source code currently lives in NETL's
`gitlab repository <https://mfix.netl.doe.gov/gitlab/exa/mfix>`_. The repository
can be cloned by using git:

.. code-block:: shell

   > git clone https://mfix.netl.doe.gov/gitlab/exa/mfix.git
   > cd mfix


.. note::

   Access to the repository is currently restricted to project members. As the
   code matures, a distribution mechanism will be developed.

Once you have obtained the source code, the following sections describe the
source code contents, compiling, running a simple simulation, and visualizing
the simulations results.

.. toctree::
   :maxdepth: 1

   Source directory overview <getting_started/Structure>
   Compiling with CMake <getting_started/BuildingCMake>
   Compiling with GMake <getting_started/BuildingGMake>
   Running your first simulation <getting_started/FirstSimulation>
   Visualizing simulation results <getting_started/Visualization>
