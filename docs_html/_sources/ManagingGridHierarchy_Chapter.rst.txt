.. role:: cpp(code)
   :language: c++

Gridding and Load Balancing
===========================

MFIX-Exa has a great deal of flexibility when it comes to how to decompose the
computational domain into individual rectangular grids, and how to distribute
those grids to MPI ranks.  There can be grids of different sizes,
more than one grid per MPI rank, and different strategies for distributing the grids to MPI ranks.

We use the phrase "load balancing" here to refer to the combined process
of grid creation (and re-creation when regridding) and distribution of grids to MPI ranks.

See :ref:`sec:grid_creation` for how grids are created, i.e. how the :cpp:`BoxArray` on which
:cpp:`MultiFabs` will be built is defined at each level.

See :ref:`sec:load_balancing` for the strategies AMReX supports for distributing
grids to MPI ranks, i.e. defining the :cpp:`DistributionMapping` with which
:cpp:`MultiFabs` at that level will be built.

MFIX-Exa also allows for the "dual grid approach", in which mesh and particle data are allocated
on different box layouts with different mappings to MPI ranks.  This option is enabled
by setting :cpp:`mfix.dual_grid = 1` in the inputs file.
See :ref:`sec:dual_grid` for more about this approach.

When running on multicore machines with OpenMP, we can also control the distribution of
work by setting the size of grid tiles (by defining :cpp:`fabarray.mfiter_tile_size`), and if relevant, of
particle tiles (by defining :cpp:`particle.tile_size`).  We can also specify the strategy for assigning
tiles to OpenMP threads.  See
`MFIter with Tiling <https://amrex-codes.github.io/amrex/docs_html/Basics.html#sec-basics-mfiter-tiling>`_
in the AMReX documentation for more about tiling.

.. toctree::
   :maxdepth: 1

   grid/GridCreation
   grid/DualGrid
   grid/LoadBalancing
