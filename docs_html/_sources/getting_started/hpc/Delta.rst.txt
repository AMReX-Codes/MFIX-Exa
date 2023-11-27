NCSA Delta
==========

.. warning:: 

   There is a known and, thus far, unresolved issue when building 
   with cmake for GPU and hypre support. 

If this is your first time building MFIX-Exa on Delta, please 
review the general notes below and `Basics`_ section first.

*  To access Delta, you will need an NCSA account which can be administered 
   by the NSF ACCESS allocation managment system. 
*  You can find the name of your account(s) and the current balance with 
   the ``accounts`` command.  
*  These instructions build MFIX-Exa on the login nodes using `-j8` CPUs. 
   You may have to decrease this value if there is high traffic 
   or you may want to increase this value if you are on a compute 
   node interactively. 
*  The cmake instructions compile to a ``build`` directory. 
   The gmake instructions compile to a ``exec`` directory. 
*  For the dependencies, it is assumed that you have set the 
   following environment variables:

   .. code:: bash

      export HYPRE_INSTALL_DIR=$HOME/<path/to/my/hypre-install-dir>
      export CSG_INSTALL_DIR=$HOME/<path/to/my/csg-dep-install-dir>
      export CSG_LIB_DIR=$HOME/<path/to/my/csg-lib-install-dir>
      export ASCENT_INSTALL_DIR=$HOME/<path/to/my/ascent-install-dir>

   to a path that you have read/write access to. 
   You will need to recall these paths later if you want to build 
   MFIX-Exa with the optional dependencies. 
*  After building the ``mfix`` executable (with cmake), you can 
   build the PIC-to-DEM restarter app by executing the following command 
   in the ``build`` directory

   .. code:: bash

      cmake --build . --target pic2dem


Basics
------

Source code
~~~~~~~~~~~
   
Before building, first obtain a copy of the source code
following the instructions on the 
`MFIX-Exa website. <https://mfix.netl.doe.gov/products/mfix-exa/download/>`_

Modules
~~~~~~~

The default modules on Delta are *almost* all that you need to build 
and compile all dependencies. If you are using ``cmake`` to build, you 
need to load a newer version, such as 

.. code:: bash 

    module load cmake/3.23.1

If you are building the CSG library or building MFIX-Exa with CSG support, 
you need to load boost, such as 

.. code:: bash 

    module load boost/1.80.0

There is a known incompatability with AMReX and the pre-loaded cuda version 11.6.1. 
To build with GPU support you will need to downgrade or upgrade versions, such as 

.. code:: bash 

    module swap cuda/11.6.1 cuda/11.7.0

Full builds that utilize external dependencies, also require setting 
certain environment variables as discussed below. 


Building MFIX-Exa
-----------------

The commands below are the superbuild instructions, i.e., 
AMReX is built as part of the MFIX-Exa build process. 
To build MFIX-Exa with hypre, csg and/or ascent dependencies, 
you first need to build and install these libraries and their dependencies.
Instructions on building the necessary dependencies are below 
and should be successfully installed first. There are two primary 
methods of building the code ``cmake`` and ``gmake`` which are provided 
seperately below.  

cmake
~~~~~

.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU

      .. code:: bash

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DMFIX_GPU_BACKEND=CUDA \
               -DAMReX_CUDA_ARCH=8.0 \
               -DCMAKE_CUDA_ARCHITECTURES="80" \
               -DGPUS_PER_NODE=4 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR

         cmake -DBoost_INCLUDE_DIR="$BOOST_ROOT/include" \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=CUDA \
               -DAMReX_CUDA_ARCH=8.0 \
               -DCMAKE_CUDA_ARCHITECTURES="80" \
               -DGPUS_PER_SOCKET=1 \
               -DGPUS_PER_NODE=2 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8


gmake
~~~~~
   
.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         make -C exec -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE
         

   .. tab:: GPU

      .. code:: bash
         
         make -C exec -j8 
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=8.0 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE


   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lgmp -lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR/lib"

         make -C exec -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE


   .. tab:: GPU-full

      .. code:: bash
         
         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lgmp -lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR/lib"

         make -C exec -j8 COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=8.0 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE




Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. HYPRE

   .. tabs::

      .. tab:: CPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR --with-MPI
            make -j8 install 
            popd

      .. tab:: GPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR \
                        --without-superlu \
                        --disable-bigint \
                        --without-openmp \
                        --with-MPI \
                        --with-cuda \
                        --with-gpu-arch='80' \
                        --with-cuda-home=$CUDA_HOME \
                        --enable-cusparse \
                        --enable-curand
            make -j8 install 
            popd

#. Catch2

   .. code:: bash

      git clone --depth 1 --branch v2.13.7 https://github.com/catchorg/Catch2
      pushd Catch2/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. GMP

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/gmp/gmp-6.2.1.tar.xz
      tar -xf gmp-6.2.1.tar.xz
      pushd gmp-6.2.1
      ./configure --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. MPFR

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/mpfr/mpfr-4.1.0.tar.xz
      tar -xf mpfr-4.1.0.tar.xz
      pushd mpfr-4.1.0/
      ./configure --with-gmp=$CSG_INSTALL_DIR --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. CGAL

   .. code:: bash

      git clone --depth 1 --branch v5.3 https://github.com/CGAL/cgal
      pushd cgal/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. PEGTL

   .. code:: bash

      git clone --branch 3.2.2 https://github.com/taocpp/PEGTL
      pushd PEGTL/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. CSG EB library  (**gmake**) 

   When building MFIX-Exa with CSG support using the ``gmake`` build option, 
   you need to install ``libcsgeb`` to ``$CSG_LIB_DIR``. This can be done 
   using ``cmake`` or ``gmake``, but since you are using ``gmake`` to build 
   MFIX-Exa, let's just assume you will opt for ``gmake`` here as well. 
   Make sure you have boost loaded before building. (This is intended to be 
   executed from inside the mfix repo.) 

   .. code:: bash

      make -C subprojects/csg-eb install DESTDIR=$CSG_LIB_DIR \
           PEGTL_HOME=$CSG_INSTALL_DIR \
           CGAL_HOME=$CSG_INSTALL_DIR \
           CATCH2_HOME=$CSG_INSTALL_DIR \
           ENABLE_CGAL=TRUE

#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.6
      mkdir build && cd build
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DENABLE_OPENMP=OFF \
            -DENABLE_MPI=ON \
            -DENABLE_CUDA=OFF \
            -DCMAKE_BUILD_TYPE=Release
      make -j8 install
      popd

#. Vtk-m

   .. code:: bash

      git clone --branch master https://gitlab.kitware.com/vtk/vtk-m.git
      pushd vtk-m/
      git checkout v1.9.0
      mkdir build && cd build/
      cmake -S ../ -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DVTKm_ENABLE_OPENMP=OFF \
            -DVTKm_ENABLE_MPI=ON \
            -DVTKm_ENABLE_CUDA=OFF \
            -DVTKm_USE_64BIT_IDS=OFF \
            -DVTKm_USE_DOUBLE_PRECISION=ON \
            -DVTKm_USE_DEFAULT_TYPES_FOR_ASCENT=ON \
            -DVTKm_NO_DEPRECATED_VIRTUAL=ON \
            -DCMAKE_BUILD_TYPE=Release
      make -j8 install
      popd

#. Ascent

   .. code:: bash

      git clone --recursive https://github.com/Alpine-DAV/ascent.git
      pushd ascent
      git checkout v0.9.0
      mkdir build && cd build/
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCONDUIT_DIR=$ASCENT_INSTALL_DIR \
            -DVTKM_DIR=$ASCENT_INSTALL_DIR \
            -DENABLE_VTKH=ON \
            -DENABLE_FORTRAN=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_DOCS=OFF \
            -DBUILD_SHARED_LIBS=ON \
            -DCMAKE_BUILD_TYPE=Release \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd


Running Jobs
------------

Common Slurm commands:

* ``sinfo`` see available/allocated resources
* ``sbatch runit_cpu.sh`` submit a cpu job to the queue
* ``squeue -u USER`` check job status of user USER
* ``squeue -p PARTITION`` check job status of partition PARTITION
* ``scancel JOBID`` kill a job with id JOBID
  ``salloc -N 1 -p gpuA100x4 -A bbsj-delta-gpu --time=00:20:00  --exclusive --gpus-per-node=4`` grab a whole GPU node interactively for 20 minutes

Example run script for GPU is below, 
CPU-only runs have not been tested on this machine.  

.. code:: bash

   #!/bin/bash
   #SBATCH --nodes=3
   #SBATCH --exclusive
   #SBATCH --ntasks-per-node=4
   #SBATCH --cpus-per-task=16    # <- match to OMP_NUM_THREADS
   #SBATCH --partition=gpuA100x4      # <- or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=bbsj-delta-gpu
   #SBATCH --job-name=mympi
   #SBATCH --time=00:05:00      # hh:mm:ss for the job
   #SBATCH --constraint="scratch"
    
   ### GPU options ###
   #SBATCH --gpus-per-node=4
   #SBATCH --gpus-per-task=1
   #SBATCH --gpu-bind=closest
   #SBATCH --mail-user=first.last@institution.edu
   #SBATCH --mail-type="BEGIN,END" 
    
   module reset
   module swap cuda/11.6.1 cuda/11.7.0
   module load boost/1.80.0
   module list
    
   echo "job is starting on `hostname`"
    
   srun -N 3 -n 12 -G 12 ./mfix inputs.rt > screen.txt


